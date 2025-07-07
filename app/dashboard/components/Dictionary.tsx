import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { Word, DictionaryProps } from '@/lib/types';
import { useEffect, useState } from 'react';
import { fetchWords } from '@/lib/api';
import AddWordDialog from './AddWordDialog ';
import { filterWords } from '@/lib/filter';

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
        <CardContent className='pb-4'>
          <ul>
            {filteredWords.length === 0 ? (
              <li>No words found.</li>
            ) : (
              filteredWords.map(({ id, word, translation, example }) => (
                <li key={id}>
                  {word} - {translation} {example && <em>({example})</em>}
                </li>
              ))
            )}
          </ul>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
