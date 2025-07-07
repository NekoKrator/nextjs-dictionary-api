import type { Word } from "./types";

export async function fetchWords(): Promise<Word[]> {
  const res = await fetch('/api/words')

  if (!res.ok) {
    console.log('Failed to fetch words')
  }

  return res.json()
}

export async function addWord(word: string, translation: string, example?: string) {
  const res = await fetch('/api/words', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ word, translation, example }),
  });

  if (!res.ok) {
    console.log('Failed to save the word');
  }

  return res.json()
}