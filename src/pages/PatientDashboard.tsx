import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useMemo, useState } from "react";
import { Clock, MessageCircle, CalendarDays, Stethoscope } from "lucide-react";
import { addAppointment, generateSlotsForDate, listAppointmentsForPatient, listDoctors } from "@/lib/store";
import { useAuth } from "@/contexts/AuthContext";

const PatientDashboard = () => {
  const { user } = useAuth();
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0,10));
  const [doctorEmail, setDoctorEmail] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [refresh, setRefresh] = useState(0);

  const doctors = useMemo(() => listDoctors(), []);
  useEffect(() => {
    if (!doctorEmail && doctors.length > 0) setDoctorEmail(doctors[0].email);
  }, [doctors, doctorEmail]);

  const slots = useMemo(() => doctorEmail && date ? generateSlotsForDate(doctorEmail, date) : [], [doctorEmail, date]);
  const myAppointments = useMemo(() => user ? listAppointmentsForPatient(user.email) : [], [user, refresh]);

  const submitBooking = () => {
    if (!user || !doctorEmail || !date || !time) return;
    const doctor = doctors.find(d => d.email === doctorEmail);
    addAppointment({
      patientEmail: user.email,
      patientName: user.name,
      doctorEmail,
      doctorName: doctor ? doctor.name : doctorEmail,
      date,
      time,
      reason: reason.trim() || undefined,
      status: 'pending',
    });
    setReason("");
    setTime("");
    setRefresh(x => x+1);
    alert("Appointment request submitted.");
  };

  return (
    <div className="min-h-screen gradient-hero">
      <Header />
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center mb-2">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Patient Dashboard</h1>
            <p className="text-muted-foreground">Track your health and manage consultations</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5 text-primary" /> Book a Consultation</CardTitle>
                <CardDescription>Request an appointment</CardDescription>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                {doctors.length === 0 ? (
                  <p className="text-muted-foreground">No doctors registered yet.</p>
                ) : (
                  <>
                    <div className="space-y-1">
                      <Label>Doctor</Label>
                      <Select value={doctorEmail} onValueChange={setDoctorEmail}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a doctor" />
                        </SelectTrigger>
                        <SelectContent>
                          {doctors.map(d => (
                            <SelectItem key={d.email} value={d.email}>{d.name} ({d.email})</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label>Date</Label>
                      <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label>Available slots</Label>
                      <Select value={time} onValueChange={setTime}>
                        <SelectTrigger>
                          <SelectValue placeholder={slots.length ? 'Select a time' : 'No slots available'} />
                        </SelectTrigger>
                        <SelectContent>
                          {slots.map(s => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label>Reason (optional)</Label>
                      <Input placeholder="e.g., follow-up, fever, etc." value={reason} onChange={e => setReason(e.target.value)} />
                    </div>
                    <Button disabled={!doctorEmail || !date || !time} onClick={submitBooking}>Submit Request</Button>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CalendarDays className="h-5 w-5 text-primary" /> My Appointments</CardTitle>
                <CardDescription>Scheduled and pending</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                {myAppointments.length === 0 ? (
                  <p>No appointments yet.</p>
                ) : (
                  myAppointments.map(a => (
                    <div key={a.id} className="p-3 rounded border flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">{a.date} {a.time}</div>
                        <div className="text-xs">Doctor: {a.doctorName}</div>
                        {a.reason && <div className="text-xs">Reason: {a.reason}</div>}
                      </div>
                      <div className="text-xs capitalize">{a.status}</div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><MessageCircle className="h-5 w-5 text-primary" /> Messages</CardTitle>
                <CardDescription>Secure chat with doctors</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Coming soon.</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Stethoscope className="h-5 w-5 text-primary" /> Recommended Actions</CardTitle>
              <CardDescription>Next steps for your care</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-3 flex-wrap">
              <Button asChild><a href="/doctor-recommendations">View Recommendations</a></Button>
              <Button variant="outline" asChild><a href="/contact-doctor">Book a Consultation</a></Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PatientDashboard;
