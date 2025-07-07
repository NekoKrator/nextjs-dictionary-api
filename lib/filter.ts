import type { Word } from './types';

export function filterWords(words: Word[], searchTerm: string): Word[] {
  if (!searchTerm) return words;

  const term = searchTerm.toLowerCase();

  return words.filter(({ word, translation }) => {
    return (
      word.toLowerCase().includes(term) ||
      translation.toLowerCase().includes(term)
    );
  });
}
