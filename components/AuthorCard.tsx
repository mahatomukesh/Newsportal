import React from 'react';
import { User } from '../types';

interface AuthorCardProps {
  author: User;
  articleCount?: number;
  onClick?: () => void;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author, articleCount = 0, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 text-center ${onClick ? 'cursor-pointer hover:shadow-md transition' : ''}`}
    >
      <img 
        src={author.avatar || `https://i.pravatar.cc/150?u=${author.id}`}
        alt={author.name}
        className="w-16 h-16 rounded-full mx-auto mb-4 border-4 border-white shadow-md"
      />
      <h3 className="text-lg font-bold text-gray-900 mb-1">{author.name}</h3>
      <p className="text-sm text-indigo-600 font-medium mb-3">Staff Writer</p>
      
      {articleCount > 0 && (
        <div className="mb-4 text-sm">
          <span className="text-gray-600">{articleCount} article{articleCount !== 1 ? 's' : ''}</span>
        </div>
      )}
      
      <p className="text-xs text-gray-500 mb-4">
        {author.email}
      </p>
      
      {onClick && (
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition">
          View Profile
        </button>
      )}
    </div>
  );
};

export default AuthorCard;
