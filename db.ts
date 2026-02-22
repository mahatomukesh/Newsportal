
import { User, UserRole, Category, NewsArticle, Comment, Newsletter } from './types';

// Mock Initial Data - Enhanced Categories (like major newspapers)
const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'News' },
  { id: '2', name: 'Politics' },
  { id: '3', name: 'Election' },
  { id: '4', name: 'Education' },
  { id: '5', name: 'Sport' },
  { id: '6', name: 'Economy' },
  { id: '7', name: 'Literature & Art' },
  { id: '8', name: 'Health & Environment' },
  { id: '9', name: 'Technology' },
  { id: '10', name: 'Province' },
  { id: '11', name: 'Local' },
  { id: '12', name: 'Sanatan & Culture' }
];

// Enhanced News Data with more fields
const createArticle = (override: Partial<NewsArticle> = {}): NewsArticle => ({
  id: Math.random().toString(36).substr(2, 9),
  title: 'Sample Article',
  content: 'Sample content',
  categoryId: '1',
  authorId: 'a1',
  createdAt: new Date().toISOString(),
  imageUrl: 'https://picsum.photos/seed/news1/800/400',
  readTime: 5,
  views: 0,
  comments: [],
  tags: [],
  isTrending: false,
  isFeatured: false,
  isBreaking: false,
  ...override
});

const INITIAL_NEWS: NewsArticle[] = [
  createArticle({
    id: 'n1',
    title: 'Breaking: Major Policy Announcement Expected Today',
    content: 'Government officials have called an emergency conference for this afternoon. This comes after weeks of speculation about significant policy changes affecting the nation\'s economy and social programs...',
    categoryId: '2',
    authorId: 'a1',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    imageUrl: 'https://picsum.photos/seed/politics1/800/400',
    isTrending: true,
    isBreaking: true,
    readTime: 3,
    views: 2450,
    tags: ['breaking', 'politics', 'policy']
  }),
  createArticle({
    id: 'n2',
    title: 'The Future of AI: What to Expect in 2025',
    content: 'Artificial Intelligence is evolving faster than ever. From multimodal models to specialized edge computing agents, the landscape of technology is shifting beneath our feet. Experts suggest that by 2025, personalized AI assistants will be integrated into every aspect of our daily productivity...',
    categoryId: '9',
    authorId: 'a1',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    imageUrl: 'https://picsum.photos/seed/tech1/800/400',
    isTrending: true,
    isFeatured: true,
    readTime: 7,
    views: 5320,
    tags: ['AI', 'technology', 'future']
  }),
  createArticle({
    id: 'n3',
    title: 'Global Markets Stabilize Amid Policy Shifts',
    content: 'After weeks of volatility, major indices showed signs of recovery today. Investors are reacting positively to new fiscal measures aimed at curbing inflation without stifling growth. The recovery was led by tech stocks, which surged 3.5% in late trading...',
    categoryId: '6',
    authorId: 'a2',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    imageUrl: 'https://picsum.photos/seed/business/800/400',
    isTrending: true,
    readTime: 5,
    views: 3890,
    tags: ['business', 'markets', 'economics']
  }),
  createArticle({
    id: 'n4',
    title: 'Championship Finals: Underdogs Take the Lead',
    content: 'In a stunning upset, the league newcomers have managed to secure a significant lead in the first half of the championship finals. The crowd is electric as the underdog team executes a flawless defensive strategy against their more experienced opponents...',
    categoryId: '5',
    authorId: 'a3',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    imageUrl: 'https://picsum.photos/seed/sports/800/400',
    readTime: 4,
    views: 4100,
    tags: ['sports', 'championship', 'update']
  }),
  createArticle({
    id: 'n5',
    title: 'Hollywood Stars Launch New Production Company',
    content: 'Multiple award-winning actors have announced the formation of a new entertainment production company focused on creating diverse, inclusive content. The venture promises to bring fresh perspectives to mainstream media...',
    categoryId: '7',
    authorId: 'a2',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    imageUrl: 'https://picsum.photos/seed/entertainment/800/400',
    readTime: 6,
    views: 2100,
    tags: ['entertainment', 'hollywood', 'industry']
  }),
  createArticle({
    id: 'n6',
    title: 'New Healthcare Initiative Launches Nationwide',
    content: 'The government has unveiled a comprehensive healthcare initiative aimed at improving medical access in rural areas. The program will establish over 500 new clinics and training centers across the nation...',
    categoryId: '8',
    authorId: 'a1',
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    imageUrl: 'https://picsum.photos/seed/health/800/400',
    isFeatured: true,
    readTime: 8,
    views: 1850,
    tags: ['health', 'policy', 'national']
  }),
  createArticle({
    id: 'n7',
    title: 'International Summit Addresses Climate Change',
    content: 'Leaders from 150 nations gathered at the annual international summit to discuss climate action. New commitments were made to reduce carbon emissions by 40% over the next decade...',
    categoryId: '8',
    authorId: 'a4',
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    imageUrl: 'https://picsum.photos/seed/climate/800/400',
    readTime: 9,
    views: 6200,
    tags: ['international', 'climate', 'environment']
  }),
  createArticle({
    id: 'n8',
    title: 'Tech Startup Claims Breakthrough in Quantum Computing',
    content: 'A Silicon Valley startup has announced what they claim is a significant breakthrough in quantum computing. If verified, the development could accelerate practical applications of quantum technology by several years...',
    categoryId: '9',
    authorId: 'a1',
    createdAt: new Date(Date.now() - 518400000).toISOString(),
    imageUrl: 'https://picsum.photos/seed/tech2/800/400',
    readTime: 6,
    views: 3450,
    tags: ['technology', 'quantum', 'startup']
  }),
  createArticle({
    id: 'n9',
    title: 'Celebrity Chef Opens New Restaurant in Downtown',
    content: 'Renowned chef opens the doors to their highly anticipated restaurant featuring fusion cuisine. The opening was attended by industry leaders and food critics who praised the innovative menu and elegant ambiance...',
    categoryId: '11',
    authorId: 'a2',
    createdAt: new Date(Date.now() - 604800000).toISOString(),
    imageUrl: 'https://picsum.photos/seed/lifestyle/800/400',
    readTime: 4,
    views: 1320,
    tags: ['lifestyle', 'food', 'entertainment']
  }),
  createArticle({
    id: 'n10',
    title: 'Opinion: The Future of Remote Work',
    content: 'As companies reassess their remote work policies, industry experts share differing views on what the workplace of the future should look like. Some advocate for hybrid models while others push for full flexibility...',
    categoryId: '1',
    authorId: 'a4',
    createdAt: new Date(Date.now() - 691200000).toISOString(),
    imageUrl: 'https://picsum.photos/seed/work/800/400',
    readTime: 7,
    views: 2890,
    tags: ['opinion', 'work', 'future']
  })
];

// Service Layer
class MockDB {
  private categories: Category[] = INITIAL_CATEGORIES;
  private news: NewsArticle[] = INITIAL_NEWS;
  private users: User[] = [
    { id: 'a1', name: 'John Smith', email: 'john@ramblog.com', role: UserRole.ADMIN, avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 'a2', name: 'Sarah Johnson', email: 'sarah@ramblog.com', role: UserRole.ADMIN, avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 'a3', name: 'Mike Davis', email: 'mike@ramblog.com', role: UserRole.ADMIN, avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 'a4', name: 'Emma Wilson', email: 'emma@ramblog.com', role: UserRole.ADMIN, avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: 'u1', name: 'Jane Doe', email: 'jane@example.com', role: UserRole.USER, avatar: 'https://i.pravatar.cc/150?img=5' }
  ];
  private newsletters: Newsletter[] = [];

  constructor() {
    const savedNews = localStorage.getItem('news_data');
    if (savedNews) this.news = JSON.parse(savedNews);
    const savedNewsletters = localStorage.getItem('newsletters_data');
    if (savedNewsletters) this.newsletters = JSON.parse(savedNewsletters);
  }

  private persistNews() {
    localStorage.setItem('news_data', JSON.stringify(this.news));
  }

  private persistNewsletters() {
    localStorage.setItem('newsletters_data', JSON.stringify(this.newsletters));
  }

  // News
  getNews() { 
    return [...this.news].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); 
  }
  
  getNewsById(id: string) { 
    return this.news.find(n => n.id === id); 
  }
  
  getRelatedArticles(articleId: string, limit: number = 3): NewsArticle[] {
    const article = this.getNewsById(articleId);
    if (!article) return [];
    
    return this.getNews()
      .filter(n => n.id !== articleId && n.categoryId === article.categoryId)
      .slice(0, limit);
  }
  
  getTrendingNews(limit: number = 5): NewsArticle[] {
    return this.getNews()
      .filter(n => n.isTrending)
      .slice(0, limit);
  }
  
  getMostReadNews(limit: number = 5): NewsArticle[] {
    return [...this.getNews()].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, limit);
  }
  
  getBreakingNews(): NewsArticle[] {
    return this.getNews().filter(n => n.isBreaking);
  }
  
  getFeaturedNews(limit: number = 3): NewsArticle[] {
    return this.getNews().filter(n => n.isFeatured).slice(0, limit);
  }
  
  createNews(article: Omit<NewsArticle, 'id' | 'createdAt'>) {
    const newArticle: NewsArticle = {
      ...article,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    this.news.push(newArticle);
    this.persistNews();
    return newArticle;
  }
  
  updateNews(id: string, updates: Partial<NewsArticle>) {
    this.news = this.news.map(n => n.id === id ? { ...n, ...updates } : n);
    this.persistNews();
  }
  
  deleteNews(id: string) {
    this.news = this.news.filter(n => n.id !== id);
    this.persistNews();
  }
  
  addComment(articleId: string, comment: Omit<Comment, 'id' | 'createdAt'>) {
    const article = this.getNewsById(articleId);
    if (article) {
      const newComment: Comment = {
        ...comment,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        likes: 0
      };
      if (!article.comments) article.comments = [];
      article.comments.push(newComment);
      this.updateNews(articleId, article);
      return newComment;
    }
    return null;
  }
  
  incrementViews(articleId: string) {
    const article = this.getNewsById(articleId);
    if (article) {
      article.views = (article.views || 0) + 1;
      this.updateNews(articleId, article);
    }
  }

  // Categories
  getCategories() { 
    return this.categories; 
  }
  
  // Newsletter
  subscribeNewsletter(email: string, categories?: string[]) {
    const existing = this.newsletters.find(n => n.email === email);
    if (!existing) {
      const subscription: Newsletter = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        subscribedAt: new Date().toISOString(),
        categories
      };
      this.newsletters.push(subscription);
      this.persistNewsletters();
      return subscription;
    }
    return existing;
  }
  
  unsubscribeNewsletter(email: string) {
    this.newsletters = this.newsletters.filter(n => n.email !== email);
    this.persistNewsletters();
  }
  
  // Users
  getUserByEmail(email: string) { 
    return this.users.find(u => u.email === email); 
  }
  
  getUserById(id: string) {
    return this.users.find(u => u.id === id);
  }
  
  getAllUsers() {
    return this.users;
  }
}

export const db = new MockDB();
