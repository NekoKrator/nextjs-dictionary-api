import { prisma } from '@/lib/db'
import type { WordInput } from '@/lib/types';

export const getWords = async (userId: number) => {
  return prisma.word.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};

export const createWord = async (userId: number, data: WordInput) => {
  return prisma.word.create({
    data: {
      word: data.word,
      translation: data.translation,
      transcription: data.transcription || null,
      audioUrl: data.audioUrl || null,
      partOfSpeech: data.partOfSpeech || null,
      definition: data.definition || null,
      example: data.example || null,
      synonyms: Array.isArray(data.synonyms) ? data.synonyms : [],
      userNote: data.userNote || null,
      userId,
    },
  });
};

export const deleteWord = async (userId: number, id: number) => {
  const word = await prisma.word.findUnique({ where: { id } });

  if (!word || word.userId !== userId) {
    throw new Error('Word not found or unauthorized');
  }

  return prisma.word.delete({ where: { id } });
};
