'use client';

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
import type { LoginFormProps } from '@/lib/types';

export default function AuthForm({
  email,
  onEmailChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <Card className='w-full max-w-sm'>
        <CardHeader className='space-y-1 text-center'>
          <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted'>
            <Mail className='h-6 w-6' />
          </div>
          <CardTitle className='text-2xl'>Login or Register</CardTitle>
          <CardDescription>Enter your email to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Input
                id='email'
                type='email'
                placeholder='Email'
                value={email}
                onChange={onEmailChange}
                required
              />
            </div>
            <Button type='submit' className='w-full'>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
