
import React, { useState, useMemo } from 'react';
import { db } from '../db';
import { NewsArticle, Category } from '../types';
import NewsCard from '../components/NewsCard';

interface NewsListProps {
  onNavigateDetail: (id: string) => void;
  categoryId?: string | null;
}

const NewsList: React.FC<NewsListProps> = ({ onNavigateDetail, categoryId }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  const news = db.getNews();
  const categories = db.getCategories();

  // Sync selectedCategory when navigated from navbar
  React.useEffect(() => {
    if (categoryId) setSelectedCategory(categoryId);
    else setSelectedCategory('ALL');
  }, [categoryId]);

  const filteredNews = useMemo(() => {
    return news.filter(n => {
      const categoryMatch = selectedCategory === 'ALL' || n.categoryId === selectedCategory;
      const searchMatch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.content.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [news, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Explore News</h1>
          <p className="text-gray-500">Stay updated with deep dives and quick updates</p>
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search articles..." 
            className="pl-10 pr-4 py-3 rounded-xl border border-gray-200 w-full md:w-80 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 py-2">
        <button 
          onClick={() => setSelectedCategory('ALL')}
          className={`px-4 py-2 rounded-full text-sm font-bold transition ${selectedCategory === 'ALL' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-indigo-400'}`}
        >
          All News
        </button>
        {categories.map(cat => (
          <button 
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition ${selectedCategory === cat.id ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-indigo-400'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map(article => (
            <NewsCard key={article.id} article={article} onClick={onNavigateDetail} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900">No results found</h3>
          <p className="text-gray-500">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
};

export default NewsList;
