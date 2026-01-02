import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  password: string;
  role: 'doctor' | 'patient';
  name: string;
  phone?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  address?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'doctor' | 'patient') => boolean;
  signup: (userData: Omit<User, 'password'> & { password: string }) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signup = (userData: Omit<User, 'password'> & { password: string }): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u: User) => u.email === userData.email)) {
      return false; // User already exists
    }
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  };

  const login = (email: string, password: string, role: 'doctor' | 'patient'): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: User) => u.email === email && u.password === password && u.role === role);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};