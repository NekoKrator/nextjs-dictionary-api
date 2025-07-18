import { getUserFromSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const user = await getUserFromSession();

  if (!user) {
    redirect('/auth/login');
  }

  return <DashboardClient user={user} />;
}
