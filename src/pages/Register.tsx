import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    if (register(name, email, password)) {
      toast.success('Account created!');
      navigate('/');
    } else {
      toast.error('Email already in use');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto flex items-center justify-center py-16">
        <div className="w-full max-w-md rounded-xl border bg-card p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Name</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <Button type="submit" className="w-full">Register</Button>
          </form>
          <p className="text-sm text-center mt-4 text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
