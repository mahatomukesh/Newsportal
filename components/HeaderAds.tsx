import React from 'react';
import Ad from './Ad';

interface HeaderAdsProps {
  className?: string;
}

const HeaderAds: React.FC<HeaderAdsProps> = ({ className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Leaderboard Banner Ad */}
      <Ad size="leaderboard" className="mb-4" />

      {/* Mobile Banner Ad - shown only on mobile */}
      <div className="md:hidden">
        <Ad size="mobile" />
      </div>
    </div>
  );
};

export default HeaderAds;