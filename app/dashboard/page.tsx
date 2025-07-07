import type { Word } from '@/lib/types';
import { getUserFromSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import Dictionary from './components/Dictionary';
import AddWordDialog from './components/AddWordDialog ';

export default async function DashboardPage() {
  const user = await getUserFromSession();

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div>
      <div>
        <h1>Dictionary of {user.email}</h1>
        <Button>
          <LogOut>Log out</LogOut>
        </Button>
      </div>
      <AddWordDialog />
      <Dictionary />
    </div>
  );
}
