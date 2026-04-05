import React, { createContext, useContext, useState, useCallback } from 'react';
import { User } from '@/data/types';
import { users } from '@/data/users';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  updateAvatar: (avatar: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(users[0]); // Pre-logged in as user1 for demo

  const login = useCallback((email: string, password: string) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (found) { setUser(found); return true; }
    return false;
  }, []);

  const register = useCallback((name: string, email: string, password: string) => {
    if (users.find(u => u.email === email)) return false;
    const newUser: User = {
      id: `user${Date.now()}`,
      name, email, password,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f97316&color=fff`,
      city: 'Unknown',
      rating: 0,
      memberSince: new Date().toISOString().split('T')[0],
    };
    users.push(newUser);
    setUser(newUser);
    return true;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const updateAvatar = useCallback((avatar: string) => {
    setUser(prev => prev ? { ...prev, avatar } : null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateAvatar }}>
      {children}
    </AuthContext.Provider>
  );
};
