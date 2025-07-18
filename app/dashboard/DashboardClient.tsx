'use client';

import Dictionary from './components/Dictionary';
import type { DashboardClientProps } from '@/lib/types';
import SearchAndStats from './components/SearchAndStats';
import { useState } from 'react';
import Header from './components/Header';

export default function DashboardClient({ user }: DashboardClientProps) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-4xl mx-auto p-6'>
        <Header user={user} />
        <SearchAndStats searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Dictionary searchTerm={searchTerm} />
      </div>
    </div>
  );
}
