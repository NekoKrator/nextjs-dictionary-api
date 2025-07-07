// app/dashboard/DashboardClient.tsx (клиентский)

'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import Dictionary from './Dictionary';
import type { DashboardClientProps } from '@/lib/types';
import { Book } from 'lucide-react';
import SearchAndStats from './SearchAndStats';
import { useState } from 'react';

export default function DashboardClient({ user }: DashboardClientProps) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-4xl mx-auto p-6'>
        {/* Header */}
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

        {/* Search and Stats */}
        <SearchAndStats searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Words List */}
        {/* <AddWordDialog onWordAdded={triggerReload} /> */}
        <Dictionary searchTerm={searchTerm} />
      </div>
    </div>
  );
}
