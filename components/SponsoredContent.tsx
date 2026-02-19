import React from 'react';
import Ad from './Ad';

interface SponsoredContentProps {
  title: string;
  content: string;
  sponsorName: string;
  sponsorLogo?: string;
  link?: string;
}

const SponsoredContent: React.FC<SponsoredContentProps> = ({
  title,
  content,
  sponsorName,
  sponsorLogo,
  link
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 my-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {sponsorLogo && (
            <img src={sponsorLogo} alt={sponsorName} className="w-8 h-8 rounded-full" />
          )}
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
              Sponsored Content
            </span>
            <p className="text-sm text-gray-600">by {sponsorName}</p>
          </div>
        </div>
        <div className="text-xs text-gray-400">AD</div>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-700 mb-4">{content}</p>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Learn More
          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}
    </div>
  );
};

export default SponsoredContent;