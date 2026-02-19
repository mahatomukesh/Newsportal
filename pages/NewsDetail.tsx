
import React, { useEffect, useState } from 'react';
import { db } from '../db';
import ShareButton from '../components/ShareButton';
import Comments from '../components/Comments';
import RelatedArticles from '../components/RelatedArticles';
import InlineAds from '../components/InlineAds';

interface NewsDetailProps {
  articleId: string;
  onBack: () => void;
  onNavigateDetail?: (id: string) => void;
}

const NewsDetail: React.FC<NewsDetailProps> = ({ articleId, onBack, onNavigateDetail = () => {} }) => {
  const [article, setArticle] = useState(db.getNewsById(articleId));
  const [commentRefresh, setCommentRefresh] = useState(0);
  const categories = db.getCategories();
  
  useEffect(() => {
    // Increment views when article opens
    db.incrementViews(articleId);
    setArticle(db.getNewsById(articleId));
  }, [articleId]);

  if (!article) return (
    <div className="py-20 text-center text-gray-600">
      <p className="text-xl font-bold">Article not found</p>
    </div>
  );

  const category = categories.find(c => c.id === article.categoryId);
  const author = db.getUserById(article.authorId);

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

      {/* Breaking News Badge */}
      {article.isBreaking && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 font-bold text-sm">🔴 BREAKING NEWS - This story is breaking and may be updated</p>
        </div>
      )}

      <div className="mb-8">
        <div className="flex gap-3 mb-4">
          <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
            {category?.name}
          </span>
          {article.isFeatured && (
            <span className="inline-block bg-yellow-100 text-yellow-700 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
              ⭐ Featured
            </span>
          )}
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
          {article.title}
        </h1>
        
        {/* Author & Meta Info */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 text-gray-600 text-sm pt-4 pb-6 border-b border-gray-100">
          {author && (
            <div className="flex items-center gap-3">
              {author.avatar && (
                <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full" />
              )}
              <div>
                <p className="font-bold text-gray-900">{author.name}</p>
                <p className="text-xs text-gray-500">Staff Writer</p>
              </div>
            </div>
          )}
          <span className="hidden md:block">•</span>
          <span>{new Date(article.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
          <span className="hidden md:block">•</span>
          {article.readTime && <span>📖 {article.readTime} min read</span>}
          <span className="hidden md:block">•</span>
          {article.views !== undefined && <span>👁️ {article.views.toLocaleString()} views</span>}
        </div>
      </div>

      {/* Featured Image */}
      <div className="rounded-3xl overflow-hidden mb-12 shadow-2xl">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-auto object-cover max-h-[500px]"
        />
      </div>

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Article Content */}
      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6 mb-12">
        <p className="text-xl font-medium text-gray-900 leading-relaxed italic border-l-4 border-indigo-600 pl-6 py-2">
          {article.content.split('.')[0]}.
        </p>
        {article.content.split('.').slice(1).map((para, idx) => (
          para.trim() && <p key={idx}>{para.trim()}.</p>
        ))}
        {/* Additional content */}
        <p>
          This article provides comprehensive coverage of the topic. Our team of experienced journalists has researched and compiled 
          the most relevant information to keep you informed. We are committed to delivering accurate, unbiased reporting that helps 
          you understand the key aspects of this story.
        </p>
        <p>
          As this story develops, we will continue to update you with the latest developments and expert analysis. Our newsroom is 
          monitoring the situation closely to ensure you have access to the most current information available.
        </p>
      </div>

      {/* Inline Ad */}
      <InlineAds showSponsored={true} />

      {/* Share & Engagement */}
      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100 transition font-bold text-sm text-gray-700">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2 1m2-1l-2-1m2 1v2.5" />
            </svg>
            {(article.views || 0).toLocaleString()} Likes
          </button>
        </div>
        <ShareButton article={article} />
      </div>

      {/* Related Articles */}
      <RelatedArticles currentArticleId={articleId} onNavigateDetail={onNavigateDetail} />

      {/* Inline Ad */}
      <InlineAds />

      {/* Comments Section */}
      <Comments
        articleId={articleId}
        comments={article.comments}
        onCommentAdded={() => {
          setCommentRefresh(prev => prev + 1);
          const updated = db.getNewsById(articleId);
          setArticle(updated);
        }}
        isAuthenticated={true}
        currentUserName="You"
      />
    </article>
  );
};

export default NewsDetail;
