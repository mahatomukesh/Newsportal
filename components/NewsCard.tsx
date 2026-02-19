
import React, { useState, useEffect } from 'react';
import { NewsArticle, Category } from '../types';
import { db } from '../db';

interface NewsCardProps {
  article: NewsArticle;
  onClick: (id: string) => void;
  featured?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, onClick, featured = false }) => {
  const categories = db.getCategories();
  const category = categories.find(c => c.id === article.categoryId);
  const author = db.getUserById(article.authorId);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Check if article is bookmarked
    const saved = localStorage.getItem('bookmarks');
    if (saved) {
      const bookmarks = JSON.parse(saved) as string[];
      setIsBookmarked(bookmarks.includes(article.id));
    }
  }, [article.id]);

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    const saved = localStorage.getItem('bookmarks');
    const bookmarks = saved ? JSON.parse(saved) : [];
    
    if (bookmarks.includes(article.id)) {
      // Remove bookmark
      const updated = bookmarks.filter((id: string) => id !== article.id);
      localStorage.setItem('bookmarks', JSON.stringify(updated));
      setIsBookmarked(false);
    } else {
      // Add bookmark
      bookmarks.push(article.id);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      setIsBookmarked(true);
    }
  };

  if (featured) {
    return (
      <div 
        onClick={() => onClick(article.id)}
        className="relative h-96 w-full rounded-2xl overflow-hidden group cursor-pointer"
      >
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute top-4 left-4">
          {article.isBreaking && (
            <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full animate-pulse">
              BREAKING
            </span>
          )}
        </div>
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">
            {category?.name}
          </span>
          <h2 className="text-3xl font-bold text-white mb-2 leading-tight">
            {article.title}
          </h2>
          <p className="text-gray-300 line-clamp-2 text-sm mb-4">
            {article.content}
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-300">
            {author && <span>{author.name}</span>}
            {article.readTime && <span>📖 {article.readTime} min read</span>}
            {article.views !== undefined && <span>👁️ {article.views.toLocaleString()} views</span>}
          </div>
          {article.tags && article.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-3">
              {article.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs bg-gray-700 text-gray-200 px-2 py-1 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={handleBookmark}
          className="absolute bottom-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full w-10 h-10 flex items-center justify-center transition text-xl"
          title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
        >
          {isBookmarked ? '❤️' : '🤍'}
        </button>
      </div>
    );
  }

  return (
    <div 
      onClick={() => onClick(article.id)}
      className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col h-full"
    >
      <div className="h-48 overflow-hidden relative">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
        />
        {article.isBreaking && (
          <div className="absolute top-3 left-3">
            <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full animate-pulse">
              BREAKING
            </span>
          </div>
        )}
        {article.isFeatured && (
          <div className="absolute top-3 right-3">
            <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              ⭐ FEATURED
            </span>
          </div>
        )}
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <span className="text-indigo-600 text-xs font-bold uppercase tracking-wider">
            {category?.name}
          </span>
          <button
            onClick={handleBookmark}
            className="text-xl hover:scale-125 transition"
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
          >
            {isBookmarked ? '❤️' : '🤍'}
          </button>
        </div>
        <h3 className="font-bold text-gray-900 mb-2 leading-snug hover:text-indigo-600 transition line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {article.content}
        </p>
        
        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex gap-1 flex-wrap mb-3">
            {article.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Author & Meta Info */}
        {author && (
          <div className="flex items-center gap-2 mb-4 pb-4 border-t border-gray-100 pt-4">
            {author.avatar && (
              <img src={author.avatar} alt={author.name} className="w-6 h-6 rounded-full" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-700">{author.name}</p>
              {article.readTime && (
                <p className="text-xs text-gray-500">📖 {article.readTime} min read</p>
              )}
            </div>
            {article.views !== undefined && (
              <span className="text-xs text-gray-500 whitespace-nowrap ml-2">👁️ {article.views.toLocaleString()}</span>
            )}
          </div>
        )}
        
        <div className="mt-auto flex items-center gap-2 text-xs">
          <span className="text-gray-500">{new Date(article.createdAt).toLocaleDateString()}</span>
        </div>
        
        <div className="mt-auto flex items-center gap-2">
          <span className="text-indigo-600 text-xs font-bold">Read Article</span>
          <svg className="w-3 h-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
