import React from 'react';

interface AdProps {
  size?: 'banner' | 'rectangle' | 'square' | 'leaderboard' | 'mobile';
  className?: string;
  placeholder?: boolean;
}

const Ad: React.FC<AdProps> = ({ size = 'banner', className = '', placeholder = true }) => {
  const getAdDimensions = () => {
    switch (size) {
      case 'banner':
        return 'w-full h-24 md:h-32'; // 728x90 or 320x50
      case 'rectangle':
        return 'w-full h-60 md:w-60 md:h-32'; // 300x250
      case 'square':
        return 'w-60 h-60'; // 250x250
      case 'leaderboard':
        return 'w-full h-24'; // 728x90
      case 'mobile':
        return 'w-full h-32'; // 320x50
      default:
        return 'w-full h-24';
    }
  };

  if (placeholder) {
    return (
      <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ${getAdDimensions()} ${className}`}>
        <div className="text-center text-gray-500">
          <div className="text-2xl mb-2">📢</div>
          <div className="text-sm font-medium">Advertisement</div>
          <div className="text-xs">{size.toUpperCase()}</div>
        </div>
      </div>
    );
  }

  // Real ad implementation would go here
  // This could integrate with Google AdSense, AdMob, or other ad networks
  return (
    <div className={`bg-gray-200 rounded-lg overflow-hidden ${getAdDimensions()} ${className}`}>
      {/* Ad network code would go here */}
      <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
        <span className="text-white font-bold text-sm">SPONSORED AD</span>
      </div>
    </div>
  );
};

export default Ad;