import React, { useState } from 'react';
import { NewsArticle } from '../types';

interface ShareButtonProps {
  article: NewsArticle;
}

const ShareButton: React.FC<ShareButtonProps> = ({ article }) => {
  const [showMenu, setShowMenu] = useState(false);

  const shareUrl = window.location.href;
  const shareText = article.title;

  const handleShare = (platform: string) => {
    let url = '';

    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      case 'email':
        url = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        break;
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
      setShowMenu(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setShowMenu(false);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C9.549 14.207 10.446 15 12 15v5m-3-6h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Share
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <button
            onClick={() => handleShare('twitter')}
            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition flex items-center gap-3"
          >
            <span>𝕏</span> Twitter
          </button>
          <button
            onClick={() => handleShare('facebook')}
            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition flex items-center gap-3"
          >
            <span>f</span> Facebook
          </button>
          <button
            onClick={() => handleShare('whatsapp')}
            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition flex items-center gap-3"
          >
            <span>💬</span> WhatsApp
          </button>
          <button
            onClick={() => handleShare('linkedin')}
            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition flex items-center gap-3"
          >
            <span>in</span> LinkedIn
          </button>
          <button
            onClick={() => handleShare('email')}
            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition flex items-center gap-3"
          >
            <span>✉️</span> Email
          </button>
          <button
            onClick={handleCopyLink}
            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition flex items-center gap-3 border-t"
          >
            <span>🔗</span> Copy Link
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
