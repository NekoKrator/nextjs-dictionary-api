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
  | 'ARTICLE'
  | null;

export interface Word {
  id: number;
  word: string;
  translation: string;
  transcription?: string | null;
  audioUrl?: string | null;
  partOfSpeech?: PartOfSpeech | null;
  definition?: string | null;
  example?: string | null;
  synonyms: string[];
  userNote?: string | null;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export interface WordInput {
  word: string;
  translation: string;
  transcription?: string | null;
  audioUrl?: string | null;
  partOfSpeech?: PartOfSpeech | null;
  definition?: string | null;
  example?: string | null;
  synonyms?: string[];
  userNote?: string | null;
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