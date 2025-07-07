import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { fetchWords } from '@/lib/api';
import { useEffect, useState } from 'react';
import type { Word, SearchAndStatsProps } from '@/lib/types';
import { filterWords } from '@/lib/filter';

export default function SearchAndStats({
  searchTerm,
  setSearchTerm,
}: SearchAndStatsProps) {
  const [words, setWords] = useState<Word[]>([]);

  const filteredWords = filterWords(words, searchTerm);

  useEffect(() => {
    fetchWords().then(setWords);
  }, []);

  return (
    <>
      <div className='flex flex-col sm:flex-row gap-4 mb-6'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4' />
          <Input
            placeholder='Search words or translations...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10'
          />
        </div>
        <div className='flex items-center space-x-4 text-sm text-slate-600'>
          <span>Total: {words.length}</span>
          {searchTerm && <span>Found: {filteredWords.length}</span>}
        </div>
      </div>
    </>
  );
}
