import { authConfig } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Home() {
  const sesstion = await getServerSession(authConfig);

  if (sesstion) {
    redirect('/dashboard');
  }

  return (
    <div>
      <h1>My dictionary</h1>
      <Link href='/auth/login'>Login</Link>
    </div>
  );
}
