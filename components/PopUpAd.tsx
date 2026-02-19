import React, { useState, useEffect } from 'react';
import Ad from './Ad';

const PopUpAd: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup ad after 10 seconds, but only once per session
    const hasSeenPopup = sessionStorage.getItem('hasSeenPopupAd');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('hasSeenPopupAd', 'true');
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full relative">
        <div className="p-6">
          <div className="text-center mb-4">
            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Advertisement</span>
          </div>
          <Ad size="rectangle" />
          <div className="text-center mt-4">
            <span className="text-xs text-gray-400">Sponsored Content</span>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close advertisement"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PopUpAd;