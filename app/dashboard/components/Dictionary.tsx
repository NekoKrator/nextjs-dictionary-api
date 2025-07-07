import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Word, DictionaryProps } from '@/lib/types';
import { useEffect, useState } from 'react';
import { fetchWords, deleteWord } from '@/lib/api';
import AddWordDialog from './AddWordDialog ';
import { filterWords } from '@/lib/filter';
import { Book, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function Dictionary({ searchTerm }: DictionaryProps) {
  const [words, setWords] = useState<Word[]>([]);
  const [reloadFlag, setReloadFlag] = useState(0);

  const triggerReload = () => setReloadFlag((prev) => prev + 1);

  const filteredWords = filterWords(words, searchTerm);
  useEffect(() => {
    fetchWords().then(setWords);
  }, [reloadFlag]);

  return (
    <Card className='mb-6'>
      <CardHeader>
        <AddWordDialog onWordAdded={triggerReload} />
        <CardContent className='pt-0'>
          {filteredWords.length === 0 ? (
            <div className='text-center py-8'>
              <div className='text-slate-400 mb-2'>
                <Book className='h-8 w-8 mx-auto' />
              </div>
              <p className='text-slate-500'>
                {searchTerm ? 'No words found' : 'No words yet'}
              </p>
              {!searchTerm && (
                <p className='text-sm text-slate-400 mt-1'>
                  Add your first word to get started
                </p>
              )}
            </div>
          ) : (
            <div className='space-y-0'>
              {filteredWords.map(
                ({ id, word, translation, example }, index) => (
                  <div key={id}>
                    <div className='flex items-start justify-between py-4 group'>
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-center space-x-3 mb-1'>
                          <h3 className='font-medium text-slate-900'>{word}</h3>
                          <Badge variant='secondary' className='text-xs'>
                            {translation}
                          </Badge>
                        </div>
                        {example && (
                          <p className='text-sm text-slate-600 italic'>
                            {example}
                          </p>
                        )}
                      </div>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={async () => {
                          deleteWord(id);
                          triggerReload();
                        }}
                        className='opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-600'
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                    {index < filteredWords.length - 1 && <Separator />}
                  </div>
                )
              )}
            </div>
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
}
