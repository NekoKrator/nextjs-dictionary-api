import { Dispatch, SetStateAction } from 'react';

export interface Word {
  id: number
  word: string
  translation: string
  example?: string
  createdAt: string
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