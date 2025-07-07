// app/dashboard/page.tsx (серверный, без 'use client')

import { getUserFromSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import DashboardClient from './components/DashboardClient';

export default async function DashboardPage() {
  const user = await getUserFromSession();

  if (!user) {
    redirect('/auth/login');
  }

  return <DashboardClient user={{ email: user.email }} />;
}
