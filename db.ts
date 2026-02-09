
import { User, UserRole, Category, NewsArticle } from './types';

// Mock Initial Data
const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'Technology' },
  { id: '2', name: 'Politics' },
  { id: '3', name: 'Sports' },
  { id: '4', name: 'Business' },
  { id: '5', name: 'Entertainment' }
];

const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'n1',
    title: 'The Future of AI: What to Expect in 2025',
    content: 'Artificial Intelligence is evolving faster than ever. From multimodal models to specialized edge computing agents, the landscape of technology is shifting beneath our feet. Experts suggest that by 2025, personalized AI assistants will be integrated into every aspect of our daily productivity...',
    categoryId: '1',
    authorId: 'a1',
    createdAt: new Date().toISOString(),
    imageUrl: 'https://picsum.photos/seed/tech1/800/400',
    isTrending: true
  },
  {
    id: 'n2',
    title: 'Global Markets Stabilize Amid Policy Shifts',
    content: 'After weeks of volatility, major indices showed signs of recovery today. Investors are reacting positively to new fiscal measures aimed at curbing inflation without stifling growth...',
    categoryId: '4',
    authorId: 'a1',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    imageUrl: 'https://picsum.photos/seed/business/800/400',
    isTrending: true
  },
  {
    id: 'n3',
    title: 'Championship Finals: Underdogs Take the Lead',
    content: 'In a stunning upset, the league newcomers have managed to secure a significant lead in the first half of the championship finals. The crowd is electric...',
    categoryId: '3',
    authorId: 'a2',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    imageUrl: 'https://picsum.photos/seed/sports/800/400'
  }
];

// Service Layer
class MockDB {
  private categories: Category[] = INITIAL_CATEGORIES;
  private news: NewsArticle[] = INITIAL_NEWS;
  private users: User[] = [
    { id: 'a1', name: 'Admin User', email: 'admin@ramblog.com', role: UserRole.ADMIN },
    { id: 'u1', name: 'Jane Doe', email: 'jane@example.com', role: UserRole.USER }
  ];

  constructor() {
    const savedNews = localStorage.getItem('news_data');
    if (savedNews) this.news = JSON.parse(savedNews);
  }

  private persist() {
    localStorage.setItem('news_data', JSON.stringify(this.news));
  }

  // News
  getNews() { return [...this.news].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); }
  getNewsById(id: string) { return this.news.find(n => n.id === id); }
  createNews(article: Omit<NewsArticle, 'id' | 'createdAt'>) {
    const newArticle: NewsArticle = {
      ...article,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    this.news.push(newArticle);
    this.persist();
    return newArticle;
  }
  updateNews(id: string, updates: Partial<NewsArticle>) {
    this.news = this.news.map(n => n.id === id ? { ...n, ...updates } : n);
    this.persist();
  }
  deleteNews(id: string) {
    this.news = this.news.filter(n => n.id !== id);
    this.persist();
  }

  // Categories
  getCategories() { return this.categories; }
  
  // Users
  getUserByEmail(email: string) { return this.users.find(u => u.email === email); }
}

export const db = new MockDB();
