import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MapPin, Shield, Stethoscope } from "lucide-react";

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen gradient-hero">
      <Header />
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center mb-2">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">My Profile</h1>
            <p className="text-muted-foreground">View and manage your account details</p>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-7 w-7 text-primary" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Badge variant="secondary" className="capitalize">{user.role}</Badge>
                  {user.role === 'doctor' ? (
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Stethoscope className="h-3 w-3" /> Verified Doctor</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Shield className="h-3 w-3" /> Patient</span>
                  )}
                </CardDescription>
              </div>
              <Button variant="outline" onClick={logout}>Logout</Button>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg border bg-background/50">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Email</div>
                  <div className="flex items-center gap-2 text-foreground"><Mail className="h-4 w-4" /> {user.email}</div>
                </div>
                {user.phone && (
                  <div className="p-4 rounded-lg border bg-background/50">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Phone</div>
                    <div className="flex items-center gap-2 text-foreground"><Phone className="h-4 w-4" /> {user.phone}</div>
                  </div>
                )}
                {user.address && (
                  <div className="p-4 rounded-lg border bg-background/50">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Address</div>
                    <div className="flex items-center gap-2 text-foreground"><MapPin className="h-4 w-4" /> {user.address}</div>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                {typeof user.age !== 'undefined' && (
                  <div className="p-4 rounded-lg border bg-background/50">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Age</div>
                    <div className="text-foreground">{user.age}</div>
                  </div>
                )}
                {user.gender && (
                  <div className="p-4 rounded-lg border bg-background/50">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Gender</div>
                    <div className="capitalize text-foreground">{user.gender}</div>
                  </div>
                )}
                <div className="p-4 rounded-lg border bg-background/50">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Security</div>
                  <div className="text-foreground text-sm">Your data is stored securely in your browser for this demo. Do not share credentials.</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Shortcuts for common tasks</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-3 flex-wrap">
                {user.role === 'patient' ? (
                  <>
                    <Button asChild>
                      <a href="/contact-doctor">Contact a Doctor</a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="/doctor-recommendations">Recommendations</a>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild>
                      <a href="/dashboard/doctor">Open Doctor Dashboard</a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="/">Go to Home</a>
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>About Your Account</CardTitle>
                <CardDescription>Role-based experience</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {user.role === 'doctor' ? (
                  <p>As a Doctor, you can manage consultations, view patient requests, and organize your schedule from the Doctor Dashboard.</p>
                ) : (
                  <p>As a Patient, you can analyze symptoms, contact doctors, and view recommendations tailored to you.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
