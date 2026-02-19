
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
  readTime?: number; // minutes
  views?: number;
  comments?: Comment[];
  tags?: string[];
  isBreaking?: boolean;
  isFeatured?: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
  likes?: number;
}

export interface Newsletter {
  id: string;
  email: string;
  subscribedAt: string;
  categories?: string[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export type View = 'HOME' | 'NEWS' | 'NEWS_DETAIL' | 'PROFILE' | 'LOGIN' | 'SYSTEM_DOCS' | 'ABOUT' | 'ARCHIVE' | 'BLOG' | 'BOOKMARKS' | 'SETTINGS';
