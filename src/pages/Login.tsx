import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Stethoscope, User } from 'lucide-react';

const Login = () => {
  const [role, setRole] = useState<'doctor' | 'patient' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    return email.toLowerCase().endsWith('@gmail.com');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!role) {
      setError('Please select your role');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid Gmail address (example@gmail.com)');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (login(email, password, role)) {
      navigate(role === 'doctor' ? '/dashboard/doctor' : '/dashboard/patient');
    } else {
      setError('Invalid email, password, or role');
    }
  };

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: 'url(/image.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Welcome to Healix</CardTitle>
            <CardDescription>Please select your role to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => setRole('doctor')}
              className="w-full h-16 flex items-center gap-3"
              variant="outline"
            >
              <Stethoscope className="h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold">Login as Doctor</div>
                <div className="text-sm text-muted-foreground">Access patient records and consultations</div>
              </div>
            </Button>
            <Button
              onClick={() => setRole('patient')}
              className="w-full h-16 flex items-center gap-3"
              variant="outline"
            >
              <User className="h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold">Login as Patient</div>
                <div className="text-sm text-muted-foreground">Access your health records and analysis</div>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: 'url(/image.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Login as {role === 'doctor' ? 'Doctor' : 'Patient'}</CardTitle>
          <CardDescription>Enter your credentials to access the website</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setRole(null)} className="flex-1">
                Back
              </Button>
              <Button type="submit" className="flex-1">Login</Button>
            </div>
          </form>
          <p className="mt-4 text-center">
            Don't have an account? <Link to="/signup" className="text-blue-600">Sign up</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;