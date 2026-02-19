
import React, { useState, useRef, useEffect } from 'react';
import { View, User, Category } from '../types';
import { db } from '../db';

interface NavbarProps {
  currentView: View;
  onNavigate: (view: View) => void;
  onNavigateToNews: (categoryId?: string) => void;
  onSearch: (query: string) => void;
  isAuthenticated: boolean;
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onNavigateToNews, onSearch, isAuthenticated, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newsDropdownOpen, setNewsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [showCategorySuggestions, setShowCategorySuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const newsDropdownRef = useRef<HTMLDivElement>(null);
  const categories = db.getCategories();

  // Format current date
  const formatCurrentDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return now.toLocaleDateString('en-US', options);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (newsDropdownRef.current && !newsDropdownRef.current.contains(event.target as Node)) {
        setNewsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close category suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowCategorySuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close news dropdown when mobile menu closes
  useEffect(() => {
    if (!isOpen) {
      setNewsDropdownOpen(false);
    }
  }, [isOpen]);

  const handleNewsNavigation = (categoryId?: string) => {
    onNavigateToNews(categoryId);
    setNewsDropdownOpen(false);
    setIsOpen(false);
  };

  const handleNewsToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setNewsDropdownOpen(!newsDropdownOpen);
  };

  const handleNewsItemClick = (categoryId?: string) => {
    handleNewsNavigation(categoryId);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4 md:px-4 max-w-7xl">
        <div className="flex justify-between h-14 sm:h-16 items-center">
          <div className="flex items-center gap-4 sm:gap-8">
            <div className="flex flex-col items-start">
              <button 
                onClick={() => onNavigate('HOME')}
                className="text-lg sm:text-2xl font-black text-indigo-600 tracking-tighter flex-shrink-0 hover:text-indigo-700 transition-colors"
              >
                The Terai Times
              </button>
              <span className="text-xs sm:text-sm text-gray-500 font-medium">
                {formatCurrentDate()}
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => onNavigate('HOME')}
                className={`font-medium text-sm transition ${currentView === 'HOME' ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
              >
                HOME
              </button>
              
              {/* News Dropdown */}
              <div className="relative" ref={newsDropdownRef}>
                <button 
                  onClick={() => setNewsDropdownOpen(!newsDropdownOpen)}
                  className={`font-medium text-sm transition ${currentView === 'NEWS' ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
                >
                  NEWS
                </button>

                {/* Dropdown Menu */}
                {newsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1">
                    <button
                      onClick={() => { onNavigateToNews(); setNewsDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-indigo-50 transition font-medium text-sm text-gray-700"
                    >
                      All News
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => { onNavigateToNews(category.id); setNewsDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 hover:bg-indigo-50 transition text-sm text-gray-600 hover:text-indigo-600"
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button 
                onClick={() => onNavigate('ABOUT')}
                className={`font-medium text-sm transition ${currentView === 'ABOUT' ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
              >
                ABOUT US
              </button>

              <button 
                onClick={() => onNavigate('ARCHIVE')}
                className={`font-medium text-sm transition ${currentView === 'ARCHIVE' ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
              >
                ARCHIVE
              </button>

              <button 
                onClick={() => onNavigate('BLOG')}
                className={`font-medium text-sm transition ${currentView === 'BLOG' ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
              >
                BLOG
              </button>

              <button 
                onClick={() => onNavigate('BOOKMARKS')}
                className={`font-medium text-sm transition ${currentView === 'BOOKMARKS' ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
              >
                📚 BOOKMARKS
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => onNavigate('SETTINGS')}
                className={`font-medium text-sm transition ${currentView === 'SETTINGS' ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
              >
                ⚙️
              </button>
              <div className="relative">
                <div ref={searchRef} className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => {
                      const q = e.target.value;
                      setSearchQuery(q);
                      if (q.trim()) {
                        const matches = categories.filter(c => c.name.toLowerCase().includes(q.toLowerCase()));
                        setFilteredCategories(matches.slice(0, 6));
                        setShowCategorySuggestions(matches.length > 0);
                      } else {
                        setFilteredCategories([]);
                        setShowCategorySuggestions(false);
                      }
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        onSearch(searchQuery);
                        setSearchQuery('');
                        setShowCategorySuggestions(false);
                      }
                    }}
                    className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition w-48"
                  />

                  {showCategorySuggestions && filteredCategories.length > 0 && (
                    <div className="absolute left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1">
                      {filteredCategories.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            onNavigateToNews(cat.id);
                            setSearchQuery('');
                            setFilteredCategories([]);
                            setShowCategorySuggestions(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-indigo-50 transition text-sm text-gray-600 hover:text-indigo-600"
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {isAuthenticated ? (
              <button 
                onClick={() => onNavigate('PROFILE')}
                className="flex items-center gap-2 py-2 px-4 rounded-full border border-gray-200 hover:bg-gray-50 transition"
              >
                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-bold">
                  {user?.name.charAt(0)}
                </div>
                <span className="text-sm font-semibold">{user?.name}</span>
              </button>
            ) : (
              <button 
                onClick={() => onNavigate('LOGIN')}
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition"
              >
                Sign In
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 hover:text-gray-900 p-2 -mr-2 ml-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-3 sm:px-4 py-3 sm:py-4 space-y-3 sm:space-y-4 max-h-[calc(100vh-3.5rem)] overflow-y-auto">
          <button onClick={() => { onNavigate('HOME'); setIsOpen(false); }} className="block w-full text-left font-medium py-3 px-3 rounded hover:bg-gray-50 transition active:bg-gray-100">Home</button>
          
          {/* Mobile News Dropdown */}
          <div className="space-y-2" ref={newsDropdownRef}>
            <button 
              onClick={handleNewsToggle}
              className="flex items-center justify-between gap-2 font-medium w-full text-left py-3 px-3 rounded hover:bg-gray-50 hover:text-indigo-600 transition text-sm sm:text-base active:bg-gray-100"
            >
              <span className="truncate">News</span>
              <svg className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ${newsDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
            {newsDropdownOpen && (
              <div className="pl-3 sm:pl-4 space-y-1 border-l-2 border-indigo-300 animate-in fade-in duration-200 max-h-96 overflow-y-auto">
                <button
                  onClick={() => handleNewsItemClick()}
                  className="block w-full text-left text-sm text-gray-600 hover:text-indigo-600 py-3 px-3 rounded hover:bg-indigo-50 transition truncate active:bg-indigo-100"
                >
                  All News
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleNewsItemClick(category.id)}
                    className="block w-full text-left text-sm text-gray-600 hover:text-indigo-600 py-3 px-3 rounded hover:bg-indigo-50 transition truncate active:bg-indigo-100"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => { onNavigate('ABOUT'); setIsOpen(false); }} className="block w-full text-left font-medium py-3 px-3 rounded hover:bg-gray-50 transition active:bg-gray-100">About Us</button>
          <button onClick={() => { onNavigate('ARCHIVE'); setIsOpen(false); }} className="block w-full text-left font-medium py-3 px-3 rounded hover:bg-gray-50 transition active:bg-gray-100">Archive</button>
          <button onClick={() => { onNavigate('BLOG'); setIsOpen(false); }} className="block w-full text-left font-medium py-3 px-3 rounded hover:bg-gray-50 transition active:bg-gray-100">Blog</button>
          <button onClick={() => { onNavigate('BOOKMARKS'); setIsOpen(false); }} className="block w-full text-left font-medium py-3 px-3 rounded hover:bg-gray-50 transition active:bg-gray-100">📚 My Bookmarks</button>
          <button onClick={() => { onNavigate('SETTINGS'); setIsOpen(false); }} className="block w-full text-left font-medium py-3 px-3 rounded hover:bg-gray-50 transition active:bg-gray-100">⚙️ Settings</button>
          <hr className="my-2" />
          {isAuthenticated ? (
            <button onClick={() => { onNavigate('PROFILE'); setIsOpen(false); }} className="block w-full text-left font-medium py-3 px-3 rounded hover:bg-gray-50 transition active:bg-gray-100">Profile</button>
          ) : (
            <button onClick={() => { onNavigate('LOGIN'); setIsOpen(false); }} className="block w-full text-left text-indigo-600 font-bold py-3 px-3 rounded hover:bg-indigo-50 transition active:bg-indigo-100">Sign In</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
