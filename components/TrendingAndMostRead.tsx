import React, { useState } from 'react';
import { db } from '../db';
import NewsCard from './NewsCard';
import InlineAds from './InlineAds';

interface TrendingAndMostReadProps {
  onNavigateDetail: (id: string) => void;
}

const TrendingAndMostRead: React.FC<TrendingAndMostReadProps> = ({ onNavigateDetail }) => {
  const [activeTab, setActiveTab] = useState<'trending' | 'mostread'>('trending');

  const trendingNews = db.getTrendingNews(6);
  const mostReadNews = db.getMostReadNews(6);

  const displayNews = activeTab === 'trending' ? trendingNews : mostReadNews;

  return (
    <section className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            {activeTab === 'trending' ? '🔥 Trending Now' : '👁️ Most Read'}
          </h2>
          <p className="text-gray-500 mt-1">
            {activeTab === 'trending'
              ? 'What everyone is reading right now'
              : 'The most popular stories this week'}
          </p>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('trending')}
          className={`px-4 py-3 font-bold border-b-2 transition ${
            activeTab === 'trending'
              ? 'text-indigo-600 border-indigo-600'
              : 'text-gray-600 border-transparent hover:text-gray-900'
          }`}
        >
          🔥 Trending
        </button>
        <button
          onClick={() => setActiveTab('mostread')}
          className={`px-4 py-3 font-bold border-b-2 transition ${
            activeTab === 'mostread'
              ? 'text-indigo-600 border-indigo-600'
              : 'text-gray-600 border-transparent hover:text-gray-900'
          }`}
        >
          👁️ Most Read
        </button>
      </div>

      {/* Inline Ad */}
      <InlineAds />

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayNews.map((article, index) => (
          <div key={article.id} className="relative">
            {/* Ranking Badge */}
            <div className="absolute top-4 right-4 z-10 bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-black text-sm">
              {index + 1}
            </div>
            <NewsCard
              article={article}
              onClick={onNavigateDetail}
            />
          </div>
        ))}
      </div>

      {displayNews.length === 0 && (
        <div className="text-center py-12 text-gray-600">
          <p>No articles available yet.</p>
        </div>
      )}
    </section>
  );
};

export default TrendingAndMostRead;
