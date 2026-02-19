import React, { useState, useEffect } from 'react';
import { db } from '../db';
import { NewsArticle } from '../types';
import NewsCard from '../components/NewsCard';

interface BookmarksPageProps {
  onNavigateDetail: (id: string) => void;
}

const Bookmarks: React.FC<BookmarksPageProps> = ({ onNavigateDetail }) => {
  const [bookmarkedArticles, setBookmarkedArticles] = useState<NewsArticle[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');

  useEffect(() => {
    // Load bookmarks from localStorage
    const savedBookmarks = localStorage.getItem('bookmarks');
    if (savedBookmarks) {
      const bookmarkIds = JSON.parse(savedBookmarks) as string[];
      const articles = bookmarkIds
        .map(id => db.getNewsById(id))
        .filter((a): a is NewsArticle => a !== undefined);
      setBookmarkedArticles(articles);
    }
  }, []);

  const handleRemoveBookmark = (articleId: string) => {
    const saved = localStorage.getItem('bookmarks');
    if (saved) {
      const bookmarkIds = JSON.parse(saved) as string[];
      const updated = bookmarkIds.filter(id => id !== articleId);
      localStorage.setItem('bookmarks', JSON.stringify(updated));
      setBookmarkedArticles(bookmarkedArticles.filter(a => a.id !== articleId));
    }
  };

  let displayedArticles = [...bookmarkedArticles];
  
  if (sortBy === 'date') {
    displayedArticles.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (sortBy === 'title') {
    displayedArticles.sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">📚 My Bookmarks</h1>
        <p className="text-gray-600">Articles saved for later reading</p>
      </div>

      {bookmarkedArticles.length > 0 ? (
        <>
          {/* Controls */}
          <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-700 font-medium">
              {bookmarkedArticles.length} article{bookmarkedArticles.length !== 1 ? 's' : ''} saved
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="date">Sort by Date (Newest)</option>
              <option value="title">Sort by Title (A-Z)</option>
            </select>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedArticles.map((article) => (
              <div key={article.id} className="relative">
                <button
                  onClick={() => handleRemoveBookmark(article.id)}
                  className="absolute top-4 right-4 z-20 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg transition"
                  title="Remove bookmark"
                >
                  ✕
                </button>
                <NewsCard
                  article={article}
                  onClick={onNavigateDetail}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📑</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Bookmarks Yet</h2>
          <p className="text-gray-600 mb-6">
            Start bookmarking articles to read later. Click the bookmark icon on any article.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
          >
            Browse Articles
          </button>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
