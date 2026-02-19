import React, { useState, useEffect } from 'react';
import Ad from './Ad';

const StickyAd: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky ad after scrolling down 500px
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 500 && !isClosed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClosed]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-md">
            <Ad size="mobile" />
          </div>
          <button
            onClick={() => setIsClosed(true)}
            className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close advertisement"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyAd;