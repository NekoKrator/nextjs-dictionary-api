'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Word, DictionaryProps } from '@/lib/types';
import { useEffect, useState } from 'react';
import { fetchWords, deleteWord } from '@/lib/api';
import AddWordDialog from './AddWordDialog ';
import { filterWords } from '@/lib/filter';
import { Book, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

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
      </CardHeader>
      <CardContent>
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
          <div className='space-y-4'>
            {filteredWords.map(
              ({
                id,
                word,
                translation,
                transcription,
                audioUrl,
                partOfSpeech,
                definition,
                example,
                synonyms,
                userNote,
              }) => (
                <Card
                  key={id}
                  className='group hover:shadow-sm transition-shadow'
                >
                  <CardContent className='pt-0 pb-4 px-4'>
                    <div className='flex items-start justify-between'>
                      <div className='flex-1 min-w-0'>
                        {/* Main info */}
                        <div className='flex items-center space-x-3 mb-2'>
                          <h3 className='text-lg font-semibold text-slate-900'>
                            {word}
                          </h3>
                          {transcription && (
                            <span className='text-sm text-slate-500 font-mono'>
                              {transcription}
                            </span>
                          )}
                          {partOfSpeech && (
                            <Badge variant='outline' className='text-xs'>
                              {partOfSpeech}
                            </Badge>
                          )}
                        </div>

                        {audioUrl && (
                          <div className='mb-3 max-w-xs'>
                            <AudioPlayer
                              src={audioUrl}
                              showJumpControls={false}
                            />
                          </div>
                        )}

                        {/* Translation */}
                        <div className='mb-3'>
                          <span className='text-slate-700 font-medium'>
                            {translation}
                          </span>
                        </div>

                        {/* Definition */}
                        {definition && (
                          <div className='mb-2 text-sm text-slate-600'>
                            {definition}
                          </div>
                        )}

                        {/* Example */}
                        {example && (
                          <div className='mb-2'>
                            <div className='text-sm text-slate-600 italic bg-slate-50 p-2 rounded'>
                              “{example}”
                            </div>
                          </div>
                        )}

                        {/* Synonyms */}
                        {synonyms && synonyms.length > 0 && (
                          <div className='mb-2'>
                            <span className='text-xs text-slate-500 uppercase tracking-wide'>
                              Synonyms:{' '}
                            </span>
                            <span className='text-sm text-slate-600'>
                              {synonyms.join(', ')}
                            </span>
                          </div>
                        )}

                        {/* User note */}
                        {userNote && (
                          <div className='mt-2 p-2 bg-blue-50 border-l-2 border-blue-200 rounded-r'>
                            <p className='text-sm text-blue-800'>{userNote}</p>
                          </div>
                        )}
                      </div>

                      {/* Buttons */}
                      <div className='flex items-center space-x-2'>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => deleteWord(id)}
                          className='opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-600'
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
