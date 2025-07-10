'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from '@/components/ui/dialog';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { addWord } from '@/lib/api';
import type { AddWordDialogProps } from '@/lib/types';

export default function AddWordDialog({ onWordAdded }: AddWordDialogProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [word, setWord] = useState('');
  const [transcription, setTranscription] = useState('');
  const [translation, setTranslation] = useState('');
  const [partOfSpeech, setPartOfSpeech] = useState('');
  const [forms, setForms] = useState('');
  const [example, setExample] = useState('');
  const [synonyms, setSynonyms] = useState('');
  const [tags, setTags] = useState('');
  const [notes, setNotes] = useState('');

  const PARTS_OF_SPEECH = [
    'noun',
    'verb',
    'adjective',
    'adverb',
    'pronoun',
    'preposition',
    'conjunction',
    'interjection',
    'article',
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await addWord({
        word,
        transcription,
        translation,
        partOfSpeech,
        forms,
        example,
        synonyms,
        tags,
        notes,
      });
      setIsModalOpen(false);

      setWord('');
      setTranscription('');
      setTranslation('');
      setPartOfSpeech('');
      setForms('');
      setExample('');
      setSynonyms('');
      setTags('');
      setNotes('');

      onWordAdded();
    } catch (error) {
      console.error('Failed to save the word', error);
    }
  }

  return (
    <div className='flex items-center justify-between'>
      <h2 className='text-lg font-medium text-slate-900'>Words</h2>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button size='sm'>
            <Plus className='mr-2 h-4 w-4' />
            Add word
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-lg max-h-[80vh] overflow-y-auto'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <DialogHeader>
              <DialogTitle>Add new word</DialogTitle>
            </DialogHeader>

            <div className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='word' className='mb-1'>
                    Word *
                  </Label>
                  <Input
                    id='word'
                    placeholder='Enter word'
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor='transcription' className='mb-1'>
                    Transcription
                  </Label>
                  <Input
                    id='transcription'
                    placeholder='Enter transcription'
                    value={transcription}
                    onChange={(e) => setTranscription(e.target.value)}
                  />
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='translation' className='mb-1'>
                    Translation *
                  </Label>
                  <Input
                    id='translation'
                    placeholder='Enter translation'
                    value={translation}
                    onChange={(e) => setTranslation(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor='partOfSpeech' className='mb-1'>
                    Part of Speech
                  </Label>
                  <Select value={partOfSpeech} onValueChange={setPartOfSpeech}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select part of speech' />
                    </SelectTrigger>
                    <SelectContent>
                      {PARTS_OF_SPEECH.map((pos) => (
                        <SelectItem key={pos} value={pos}>
                          {pos}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor='forms' className='mb-1'>
                  Forms
                </Label>
                <Input
                  id='forms'
                  placeholder='run, ran, run (comma separated)'
                  value={forms}
                  onChange={(e) => setForms(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor='example' className='mb-1'>
                  Example (optional)
                </Label>
                <Input
                  id='example'
                  placeholder='Enter example sentence'
                  value={example}
                  onChange={(e) => setExample(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor='synonyms' className='mb-1'>
                  Synonyms
                </Label>
                <Input
                  id='synonyms'
                  placeholder='word1, word2, word3'
                  value={synonyms}
                  onChange={(e) => setSynonyms(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor='tags' className='mb-1'>
                  Tags
                </Label>
                <Input
                  id='tags'
                  placeholder='tag1, tag2, tag3'
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor='notes' className='mb-1'>
                  Notes
                </Label>
                <Input
                  id='notes'
                  placeholder='Additional notes'
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
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
