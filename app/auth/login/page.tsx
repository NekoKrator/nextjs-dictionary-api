'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import LoginForm from './components/AuthForm';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await signIn('credentials', {
      email,
      redirect: false,
    });

    if (res?.ok) {
      router.push('/dashboard');
    } else {
      console.log('Login or registration error');
    }
  }

  return (
    <LoginForm
      email={email}
      password={password}
      onEmailChange={(e) => setEmail(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
      onSubmit={handleSubmit}
    />
  );
}
