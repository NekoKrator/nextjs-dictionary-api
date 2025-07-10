import { Dispatch, SetStateAction } from 'react';

export type PartOfSpeech =
  | 'NOUN'
  | 'VERB'
  | 'ADJECTIVE'
  | 'ADVERB'
  | 'PRONOUN'
  | 'PREPOSITION'
  | 'CONJUNCTION'
  | 'INTERJECTION'
  | 'ARTICLE';

export type WordStatus = 'NEW' | 'LEARNING' | 'MASTERED';

export interface Word {
  id: number;
  word: string;
  translation: string;
  transcription?: string;
  partOfSpeech?: PartOfSpeech;
  forms?: string;
  example?: string;
  synonyms?: string;
  tags?: string;
  notes?: string;
  status: WordStatus;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export interface WordData {
  word: string;
  transcription?: string;
  translation: string;
  partOfSpeech?: string;
  forms?: string;
  example?: string;
  synonyms?: string;
  tags?: string;
  notes?: string;
}


export interface User {
  id?: number
  email: string
}

export interface DashboardClientProps {
  user: User;
}

export interface AddWordDialogProps {
  onWordAdded: () => void;
}

export interface LoginFormProps {
  email: string
  password: string
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
}

export interface SearchAndStatsProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export interface DictionaryProps {
  searchTerm: string;
}