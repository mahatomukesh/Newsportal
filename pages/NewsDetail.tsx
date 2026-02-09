
import React from 'react';
import { db } from '../db';

interface NewsDetailProps {
  articleId: string;
  onBack: () => void;
}

const NewsDetail: React.FC<NewsDetailProps> = ({ articleId, onBack }) => {
  const article = db.getNewsById(articleId);
  const categories = db.getCategories();
  
  if (!article) return <div>Article not found</div>;

  const category = categories.find(c => c.id === article.categoryId);

  return (
    <article className="max-w-4xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-indigo-600 font-bold mb-8 hover:translate-x-[-4px] transition duration-200"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
        </svg>
        Back to News
      </button>

      <div className="mb-8">
        <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4">
          {category?.name}
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center gap-4 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
            <span className="font-semibold text-gray-900">Staff Reporter</span>
          </div>
          <span>•</span>
          <span>{new Date(article.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
          <span>•</span>
          <span>5 min read</span>
        </div>
      </div>

      <div className="rounded-3xl overflow-hidden mb-12 shadow-2xl">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-auto object-cover max-h-[500px]"
        />
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
        <p className="text-xl font-medium text-gray-900 leading-relaxed italic border-l-4 border-indigo-600 pl-6 py-2">
          {article.content.split('.')[0]}.
        </p>
        {article.content.split('.').slice(1).map((para, idx) => (
          para.trim() && <p key={idx}>{para.trim()}.</p>
        ))}
        {/* Mocking extra long content */}
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>
      </div>

      <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100 transition">
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-sm font-bold">2.4k</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100 transition">
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-sm font-bold">156</span>
          </button>
        </div>
        <button className="text-gray-500 hover:text-indigo-600 transition">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>
    </article>
  );
};

export default NewsDetail;
