import React from 'react';
import { db } from '../db';

interface BreakingNewsBannerProps {
  onClick: (articleId: string) => void;
}

const BreakingNewsBanner: React.FC<BreakingNewsBannerProps> = ({ onClick }) => {
  const breakingNews = db.getBreakingNews();

  if (breakingNews.length === 0) {
    return null;
  }

  const latestBreaking = breakingNews[0];

  return (
    <div className="bg-red-600 text-white px-4 py-3 sticky top-14 z-40">
      <div className="container mx-auto max-w-7xl">
        <button
          onClick={() => onClick(latestBreaking.id)}
          className="flex items-center gap-3 hover:gap-4 transition width-full text-left"
        >
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="font-black text-sm uppercase tracking-widest">BREAKING</span>
          </div>
          <span className="font-bold line-clamp-1 text-sm md:text-base">
            {latestBreaking.title}
          </span>
          <span className="ml-auto flex-shrink-0">→</span>
        </button>
      </div>
    </div>
  );
};

export default BreakingNewsBanner;
