// app/dashboard/DashboardClient.tsx (клиентский)

'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import Dictionary from './Dictionary';
import AddWordDialog from './AddWordDialog ';
import type { User } from '@/lib/types';
import { useState } from 'react';

export default function DashboardClient({ user }: { user: User }) {
  const [reloadFlag, setReloadFlag] = useState(0);

  const triggerReload = () => setReloadFlag((prev) => prev + 1);

  return (
    <div>
      <div>
        <h1>Dictionary of {user.email}</h1>
        <Button onClick={() => signOut()}>
          <LogOut /> Log out
        </Button>
      </div>
      <AddWordDialog onWordAdded={triggerReload} />
      <Dictionary reloadFlag={reloadFlag} />
    </div>
  );
}
