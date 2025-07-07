// app/dashboard/DashboardClient.tsx (клиентский)

'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import Dictionary from './Dictionary';
import AddWordDialog from './AddWordDialog ';
import type { User } from '@/lib/types';

export default function DashboardClient({ user }: { user: User }) {
  return (
    <div>
      <div>
        <h1>Dictionary of {user.email}</h1>
        <Button onClick={() => signOut()}>
          <LogOut /> Log out
        </Button>
      </div>
      <AddWordDialog />
      <Dictionary />
    </div>
  );
}
