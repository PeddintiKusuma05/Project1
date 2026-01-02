// Simple localStorage-backed store for appointments and doctor availability
// This enables patient bookings and doctor management without a backend.

export type Role = 'doctor' | 'patient';

export type AppointmentStatus = 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  patientEmail: string;
  patientName: string;
  doctorEmail: string;
  doctorName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm 24h
  reason?: string; // short message from patient
  status: AppointmentStatus;
  createdAt: string; // ISO
}

export interface WeeklyAvailabilityDay {
  // Time range in HH:mm format (e.g., 09:00 - 17:00). Empty means unavailable
  start?: string;
  end?: string;
}

export interface WeeklyAvailability {
  // 0=Sunday ... 6=Saturday
  days: Record<number, WeeklyAvailabilityDay>;
  slotMinutes: number; // e.g., 30
}

const APPOINTMENTS_KEY = 'appointments';
const AVAILABILITY_KEY = 'availability';

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Users (read-only, origin from Auth)
export function getCurrentUser(): { email: string; name: string; role: Role } | null {
  try {
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    const u = JSON.parse(raw);
    return { email: u.email, name: u.name, role: u.role };
  } catch {
    return null;
  }
}

export function getAllUsers(): Array<{ email: string; name: string; role: Role } & Record<string, any>> {
  const arr = readJSON<any[]>('users', []);
  return arr.map(u => ({ email: u.email, name: u.name, role: u.role, ...u }));
}

// Appointments
export function getAppointments(): Appointment[] {
  return readJSON<Appointment[]>(APPOINTMENTS_KEY, []);
}

export function saveAppointments(list: Appointment[]) {
  writeJSON(APPOINTMENTS_KEY, list);
}

export function addAppointment(a: Omit<Appointment, 'id' | 'createdAt' | 'status'> & { status?: AppointmentStatus }): Appointment {
  const list = getAppointments();
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const createdAt = new Date().toISOString();
  const item: Appointment = { id, createdAt, status: a.status ?? 'pending', ...a };
  list.push(item);
  saveAppointments(list);
  return item;
}

export function listAppointmentsForPatient(email: string): Appointment[] {
  return getAppointments()
    .filter(a => a.patientEmail === email)
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
}

export function listAppointmentsForDoctor(email: string): Appointment[] {
  return getAppointments()
    .filter(a => a.doctorEmail === email)
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
}

export function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  const list = getAppointments();
  const idx = list.findIndex(a => a.id === id);
  if (idx >= 0) {
    list[idx].status = status;
    saveAppointments(list);
  }
}

export function cancelAppointment(id: string) {
  updateAppointmentStatus(id, 'cancelled');
}

// Availability
export function getDoctorWeeklyAvailability(doctorEmail: string): WeeklyAvailability | null {
  const map = readJSON<Record<string, WeeklyAvailability>>(AVAILABILITY_KEY, {});
  return map[doctorEmail] ?? null;
}

export function setDoctorWeeklyAvailability(doctorEmail: string, availability: WeeklyAvailability) {
  const map = readJSON<Record<string, WeeklyAvailability>>(AVAILABILITY_KEY, {});
  map[doctorEmail] = availability;
  writeJSON(AVAILABILITY_KEY, map);
}

// Slot generation helpers
function toMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function fromMinutes(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const hs = h.toString().padStart(2, '0');
  const ms = m.toString().padStart(2, '0');
  return `${hs}:${ms}`;
}

export function generateSlotsForDate(doctorEmail: string, dateStr: string): string[] {
  const availability = getDoctorWeeklyAvailability(doctorEmail);
  if (!availability) return [];
  const date = new Date(dateStr + 'T00:00:00');
  if (isNaN(date.getTime())) return [];
  const weekday = date.getDay(); // 0-6
  const day = availability.days[weekday];
  if (!day || !day.start || !day.end) return [];

  const startM = toMinutes(day.start);
  const endM = toMinutes(day.end);
  const slots: string[] = [];
  for (let t = startM; t + availability.slotMinutes <= endM; t += availability.slotMinutes) {
    slots.push(fromMinutes(t));
  }

  // Filter out already booked slots
  const taken = new Set(
    listAppointmentsForDoctor(doctorEmail)
      .filter(a => a.date === dateStr && a.status !== 'declined' && a.status !== 'cancelled')
      .map(a => a.time)
  );
  const now = new Date();
  const todayStr = new Date().toISOString().slice(0, 10);

  return slots.filter(time => {
    if (taken.has(time)) return false;
    // Block past times for today
    if (dateStr === todayStr) {
      const [h, m] = time.split(':').map(Number);
      const slotDate = new Date();
      slotDate.setHours(h, m, 0, 0);
      if (slotDate.getTime() <= now.getTime()) return false;
    }
    return true;
  });
}

// Utility: find doctors (based on registered users with role 'doctor')
export function listDoctors(): Array<{ email: string; name: string }> {
  return getAllUsers()
    .filter(u => u.role === 'doctor')
    .map(u => ({ email: u.email, name: u.name }));
}

// Utility: find patients
export function listPatients(): Array<{ email: string; name: string }> {
  return getAllUsers()
    .filter(u => u.role === 'patient')
    .map(u => ({ email: u.email, name: u.name }));
}
