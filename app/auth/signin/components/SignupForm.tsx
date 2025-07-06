import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await signIn('credentials', {
      email,
      redirect: true,
    });

    if (res?.ok) {
      router.push('/dashboard');
    } else {
      alert('Login or registration error');
    }
  }

  return (
    <Card>
      <CardHeader>
        <div>
          <Mail />
        </div>
        <CardTitle>Please Login/Register</CardTitle>
        <CardDescription>Enter your Email for login</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <Input
            id='email'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type='submit'>Login</Button>
        </form>
      </CardContent>
    </Card>
  );
}
