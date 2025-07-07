import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth';

export default async function DashboardPage() {
  const session = await getServerSession(authConfig);

  return (
    <div>
      <h1>Welcome!</h1>
      {session?.user?.email ? (
        <p>Your email: {session.user.email}</p>
      ) : (
        <p>You are not logged int</p>
      )}
    </div>
  );
}
