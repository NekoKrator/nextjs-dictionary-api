import type { Word, WordData } from "./types";

export async function fetchWords(): Promise<Word[]> {
  const res = await fetch('/api/words')

  if (!res.ok) {
    console.log('Failed to fetch words')
  }

  return res.json()
}

export async function addWord(data: WordData) {
  const res = await fetch('/api/words', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to add word');
  }

  return res.json();
}

export async function deleteWord(id: number) {
  const res = await fetch(`/api/words?id=${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    console.log('Failed to delete the word');
  }

  return res.json()
}