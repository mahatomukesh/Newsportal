
import React, { useMemo } from 'react';
import { db } from '../db';
import NewsCard from '../components/NewsCard';
import TrendingAndMostRead from '../components/TrendingAndMostRead';
import InlineAds from '../components/InlineAds';
import PopularSearches from '../components/PopularSearches';
import SidebarAds from '../components/SidebarAds';

interface HomeProps {
  onNavigateNews: (categoryId?: string) => void;
  onNavigateDetail: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigateNews, onNavigateDetail }) => {
  const news = db.getNews();
  const categories = db.getCategories();
  const featuredNews = db.getFeaturedNews(1);
  const breakingNews = db.getBreakingNews();

  const latest = useMemo(() => news.slice(0, 6), [news]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-16">
      {/* Breaking News Alert */}
      {breakingNews.length > 0 && (
        <section className="p-6 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl text-white">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🚨</div>
            <div>
              <h2 className="text-lg font-black mb-2">BREAKING NEWS</h2>
              <p className="text-red-100 mb-4">{breakingNews[0].title}</p>
              <button 
                onClick={() => onNavigateDetail(breakingNews[0].id)}
                className="px-6 py-2 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition"
              >
                Read Full Story →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Popular Searches */}
      <PopularSearches onSearch={onNavigateNews} />

      {/* Featured Article */}
      {featuredNews.length > 0 && (
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">Featured Story</h1>
              <p className="text-gray-500">Today's top pick from our editors</p>
            </div>
            <button 
              onClick={() => onNavigateNews()}
              className="text-indigo-600 font-bold text-sm hover:underline hidden md:block"
            >
              See all stories &rarr;
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {featuredNews.map(article => (
              <NewsCard 
                key={article.id} 
                article={article} 
                onClick={onNavigateDetail} 
                featured={true} 
              />
            ))}
          </div>
        </section>
      )}

      {/* Inline Ad */}
      <InlineAds />

      {/* Trending & Most Read */}
      <TrendingAndMostRead onNavigateDetail={onNavigateDetail} />

      {/* Inline Ad */}
      <InlineAds showSponsored={true} />

        {/* Category Previews */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => onNavigateNews(cat.id)}
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
          <button 
            onClick={() => onNavigateNews()}
            className="text-indigo-600 font-bold text-sm hover:underline"
          >
            Explore all →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latest.map(article => (
            <NewsCard key={article.id} article={article} onClick={onNavigateDetail} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <button 
            onClick={() => onNavigateNews()}
            className="px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition shadow-lg"
          >
            Explore More News
          </button>
        </div>
        </section>
      </div>

      {/* Sidebar for desktop */}
      <div className="lg:col-span-1">
        <div className="hidden lg:block">
          {/* Categories accessible via the top Categories button */}
        </div>
        <SidebarAds />
      </div>
      {/* Mobile sidebar above content */}
      <div className="block lg:hidden col-span-1">
        {/* Categories accessible via the top Categories button */}
      </div>
    </div>
  );
};

export default Home;
