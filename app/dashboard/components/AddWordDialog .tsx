'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { addWord } from '@/lib/api';
import type { AddWordDialogProps } from '@/lib/types';

export default function AddWordDialog({ onWordAdded }: AddWordDialogProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [example, setExample] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await addWord(word, translation, example);
      setIsModalOpen(false);
      setWord('');
      setTranslation('');
      setExample('');
      onWordAdded();
    } catch {
      console.log('Failed to save the word');
    }
  }

  return (
    <div className='flex items-center justify-between'>
      <h2 className='text-lg font-medium text-slate-900'>Words</h2>
      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
        }}
      >
        <DialogTrigger asChild>
          <Button size='sm'>
            <Plus className='mr-2 h-4 w-4' />
            Add word
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-md'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <DialogHeader>
              <DialogTitle>Add new word</DialogTitle>
            </DialogHeader>

            <div className='space-y-4'>
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
                <Label htmlFor='translation'>Translation</Label>
                <Input
                  id='translation'
                  placeholder='Enter translation'
                  value={translation}
                  onChange={(e) => setTranslation(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor='example'>Example (optional)</Label>
                <Input
                  id='example'
                  placeholder='Enter example sentence'
                  value={example}
                  onChange={(e) => setExample(e.target.value)}
                />
              </div>
            </div>

            <Button type='submit' className='w-full'>
              Save word
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
