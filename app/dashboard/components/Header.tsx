import type { DashboardClientProps } from '@/lib/types';
import { Book, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

export default function Header({ user }: DashboardClientProps) {
  return (
    <div className='flex items-center justify-between mb-8'>
      <div className='flex items-center space-x-3'>
        <div className='p-2 bg-slate-100 rounded-lg border'>
          <Book className='h-5 w-5 text-slate-600' />
        </div>
        <div>
          <h1 className='text-2xl font-semibold text-slate-900'>
            Personal Dictionary
          </h1>
          <p className='text-sm text-slate-500'>{user.email}</p>
        </div>
      </div>
      <Button
        variant='outline'
        size='sm'
        onClick={() => signOut()}
        className='text-slate-600'
      >
        <LogOut className='mr-2 h-4 w-4' />
        Sign out
      </Button>
    </div>
  );
}
