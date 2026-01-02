import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, ClipboardList, CalendarCheck, Inbox } from "lucide-react";
import { useMemo, useState } from "react";
import { getCurrentUser, listAppointmentsForDoctor, setDoctorWeeklyAvailability, getDoctorWeeklyAvailability, WeeklyAvailability, updateAppointmentStatus } from "@/lib/store";

const DoctorDashboard = () => {
  const me = getCurrentUser();
  const [refresh, setRefresh] = useState(0);
  const [slotMinutes, setSlotMinutes] = useState<string>(() => (getDoctorWeeklyAvailability(me?.email || '')?.slotMinutes || 30).toString());
  const [availability, setAvailability] = useState<WeeklyAvailability>(() => getDoctorWeeklyAvailability(me?.email || '') || {
    slotMinutes: 30,
    days: {
      1: { start: '09:00', end: '17:00' }, // Monday default
      2: { start: '09:00', end: '17:00' },
      3: { start: '09:00', end: '17:00' },
      4: { start: '09:00', end: '17:00' },
      5: { start: '09:00', end: '17:00' },
    }
  });

  const appts = useMemo(() => me ? listAppointmentsForDoctor(me.email) : [], [me, refresh]);

  const saveAvailability = () => {
    if (!me) return;
    const mins = parseInt(slotMinutes) || 30;
    setDoctorWeeklyAvailability(me.email, { ...availability, slotMinutes: mins });
    alert('Availability saved.');
  };

  const setDay = (day: number, field: 'start' | 'end', value: string) => {
    setAvailability(prev => ({
      ...prev,
      days: { ...prev.days, [day]: { ...(prev.days?.[day] || {}), [field]: value } }
    }));
  };

  const onDecision = (id: string, status: 'accepted' | 'declined' | 'completed') => {
    updateAppointmentStatus(id, status);
    setRefresh(x => x+1);
  };

  return (
    <div className="min-h-screen gradient-hero">
      <Header />
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center mb-2">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Doctor Dashboard</h1>
            <p className="text-muted-foreground">Manage patient consultations and schedule</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Inbox className="h-5 w-5 text-primary" /> Incoming Requests</CardTitle>
                <CardDescription>Latest consultation requests</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                {appts.length === 0 ? (
                  <p>No requests yet.</p>
                ) : (
                  appts.map(a => (
                    <div key={a.id} className="p-3 rounded border">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-foreground">{a.date} {a.time}</div>
                        <div className="text-xs capitalize">{a.status}</div>
                      </div>
                      <div className="text-xs">Patient: {a.patientName} ({a.patientEmail})</div>
                      {a.reason && <div className="text-xs">Reason: {a.reason}</div>}
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" onClick={() => onDecision(a.id, 'accepted')}>Accept</Button>
                        <Button size="sm" variant="outline" onClick={() => onDecision(a.id, 'declined')}>Decline</Button>
                        <Button size="sm" variant="secondary" onClick={() => onDecision(a.id, 'completed')}>Mark Completed</Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Patients</CardTitle>
                <CardDescription>Your patients overview</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Patients will appear here when they book appointments with you.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CalendarCheck className="h-5 w-5 text-primary" /> Weekly Availability</CardTitle>
                <CardDescription>Set your working hours</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <div>
                  <Label>Slot duration (minutes)</Label>
                  <Select value={slotMinutes} onValueChange={setSlotMinutes}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {[15, 20, 30, 45, 60].map(m => (
                        <SelectItem key={m} value={String(m)}>{m} minutes</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {[1,2,3,4,5,6,0].map(d => (
                  <div key={d} className="grid grid-cols-2 gap-2 items-end">
                    <div>
                      <Label>{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d]}</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="Start HH:mm" value={availability.days?.[d]?.start || ''} onChange={e => setDay(d, 'start', e.target.value)} />
                        <Input placeholder="End HH:mm" value={availability.days?.[d]?.end || ''} onChange={e => setDay(d, 'end', e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
                <Button onClick={saveAvailability}>Save Availability</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ClipboardList className="h-5 w-5 text-primary" /> Actions</CardTitle>
              <CardDescription>Quick management</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-3 flex-wrap">
              <Button asChild><a href="/profile">View My Profile</a></Button>
              <Button variant="outline" asChild><a href="/">Go to Home</a></Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DoctorDashboard;
