
import React from 'react';
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
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">
            {category?.name}
          </span>
          <h2 className="text-3xl font-bold text-white mb-2 leading-tight">
            {article.title}
          </h2>
          <p className="text-gray-300 line-clamp-2 text-sm">
            {article.content}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => onClick(article.id)}
      className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col h-full"
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
        />
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <span className="text-indigo-600 text-xs font-bold uppercase tracking-wider">
            {category?.name}
          </span>
          <span className="text-gray-400 text-xs">
            {new Date(article.createdAt).toLocaleDateString()}
          </span>
        </div>
        <h3 className="font-bold text-gray-900 mb-2 leading-snug group-hover:text-indigo-600 transition">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {article.content}
        </p>
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
