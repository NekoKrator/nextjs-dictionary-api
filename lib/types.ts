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

export interface LoginFormProps {
  email: string
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
}