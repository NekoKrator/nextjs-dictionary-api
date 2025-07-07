'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function AddWordDialog() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [example, setExample] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch('/api/words', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word, translation, example }),
    });

    if (res.ok) {
      setIsModalOpen(false);
      setWord('');
      setTranslation('');
      setExample('');
    } else {
      console.log('Failed to save the word');
    }
  }
  return (
    <>
      <div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus />
              Add
            </Button>
          </DialogTrigger>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add new word</DialogTitle>
              </DialogHeader>
              <div>
                <div>
                  <Label htmlFor='word'>Word</Label>
                  <Input
                    id='word'
                    placeholder='Enter word'
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor='translation'>translation</Label>
                  <Input
                    id='translation'
                    placeholder='Enter translation'
                    value={translation}
                    onChange={(e) => setTranslation(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor='example'>Example of usage (optional)</Label>
                  <Input
                    id='example'
                    placeholder='Enter example'
                    value={example}
                    onChange={(e) => setExample(e.target.value)}
                  />
                </div>
                <Button type='submit'>Save</Button>
              </div>
            </DialogContent>
          </form>
        </Dialog>
      </div>
    </>
  );
}
