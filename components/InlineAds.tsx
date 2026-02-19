import React from 'react';
import Ad from './Ad';

interface InlineAdsProps {
  className?: string;
  showSponsored?: boolean;
}

const InlineAds: React.FC<InlineAdsProps> = ({ className = '', showSponsored = false }) => {
  return (
    <div className={`my-8 ${className}`}>
      <div className="text-center mb-4">
        <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Advertisement</span>
      </div>

      <div className="flex justify-center">
        <Ad size="banner" className="max-w-4xl" />
      </div>

      {showSponsored && (
        <div className="text-center mt-2">
          <span className="text-xs text-gray-400">Sponsored by our partners</span>
        </div>
      )}
    </div>
  );
};

export default InlineAds;