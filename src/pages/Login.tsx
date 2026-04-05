import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      toast.success('Welcome back!');
      navigate('/');
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto flex items-center justify-center py-16">
        <div className="w-full max-w-md rounded-xl border bg-card p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" placeholder="alex@example.com" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" placeholder="password123" />
            </div>
            <Button type="submit" className="w-full">Login</Button>
          </form>
          <p className="text-sm text-center mt-4 text-muted-foreground">
            Don't have an account? <Link to="/register" className="text-primary hover:underline">Register</Link>
          </p>
          <p className="text-xs text-center mt-2 text-muted-foreground">
            Demo: alex@example.com / password123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
