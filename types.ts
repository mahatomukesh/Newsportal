
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  authorId: string;
  createdAt: string;
  imageUrl: string;
  isTrending?: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export type View = 'HOME' | 'NEWS' | 'NEWS_DETAIL' | 'PROFILE' | 'LOGIN' | 'SYSTEM_DOCS' | 'ABOUT';
