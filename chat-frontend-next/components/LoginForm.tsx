"use client";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      router.push('/');
    } catch (error: any) {
      alert(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="p-8 rounded-lg bg-white shadow-md w-96">
      <h2 className="text-xl font-bold mb-4">Sign In</h2>
      <Input 
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4"
      />
      <Input 
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4"
      />
      <Button onClick={handleLogin} className="w-full">Login</Button>
    </div>
  );
} 