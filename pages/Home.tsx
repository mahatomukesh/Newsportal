
import React, { useMemo } from 'react';
import { db } from '../db';
import NewsCard from '../components/NewsCard';

interface HomeProps {
  onNavigateNews: () => void;
  onNavigateDetail: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigateNews, onNavigateDetail }) => {
  const news = db.getNews();
  const categories = db.getCategories();

  const trending = useMemo(() => news.filter(n => n.isTrending), [news]);
  const latest = useMemo(() => news.slice(0, 6), [news]);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Trending Now</h1>
            <p className="text-gray-500">The most discussed stories today</p>
          </div>
          <button 
            onClick={onNavigateNews}
            className="text-indigo-600 font-bold text-sm hover:underline"
          >
            See all stories &rarr;
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {trending.slice(0, 2).map(article => (
            <NewsCard 
              key={article.id} 
              article={article} 
              onClick={onNavigateDetail} 
              featured={true} 
            />
          ))}
        </div>
      </section>

      {/* Category Previews */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={onNavigateNews}
              className="flex-shrink-0 px-6 py-3 rounded-xl bg-white border border-gray-200 shadow-sm hover:border-indigo-400 hover:text-indigo-600 transition font-bold text-sm"
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Latest News Feed */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-bold">Latest Headlines</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latest.map(article => (
            <NewsCard key={article.id} article={article} onClick={onNavigateDetail} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <button 
            onClick={onNavigateNews}
            className="px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition shadow-lg"
          >
            Explore More News
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
