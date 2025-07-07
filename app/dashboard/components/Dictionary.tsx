import { Card, CardContent } from '@/components/ui/card';
import type { Word } from '@/lib/types';
import { useEffect, useState } from 'react';

async function fetchWords(): Promise<Word[]> {
  const res = await fetch('/api/words');
  if (!res.ok) {
    console.log('Failed to fetch words');
  }
  return res.json();
}

export default function Dictionary({ reloadFlag }: { reloadFlag: number }) {
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    fetchWords().then(setWords);
  }, [reloadFlag]);

  return (
    <>
      <Card>
        <CardContent>
          <ul>
            {words.length === 0 && <li>No words yet.</li>}
            {words.map(({ id, word, translation, example }) => (
              <li key={id}>
                {word} - {translation}
                {example && <em> ({example})</em>}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
