import React from 'react';
import { NewsArticle } from '../types';
import { db } from '../db';
import NewsCard from './NewsCard';
import InlineAds from './InlineAds';

interface RelatedArticlesProps {
  currentArticleId: string;
  onNavigateDetail: (id: string) => void;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ currentArticleId, onNavigateDetail }) => {
  const relatedArticles = db.getRelatedArticles(currentArticleId, 3);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t border-gray-200">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Related Articles</h2>
        <p className="text-gray-600">Read more stories on similar topics</p>
      </div>

      {/* Inline Ad */}
      <InlineAds />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedArticles.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
            onClick={onNavigateDetail}
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
