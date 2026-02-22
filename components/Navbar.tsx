
import React, { useState, useRef, useEffect } from 'react';
import { View, User, Category } from '../types';
import { db } from '../db';
import CategoryDrawer from './CategoryDrawer';

interface NavbarProps {
  currentView: View;
  onNavigate: (view: View) => void;
  onNavigateToNews: (categoryId?: string) => void;
  onSearch: (query: string) => void;
  isAuthenticated: boolean;
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onNavigateToNews, onSearch, isAuthenticated, user }) => {
  const [newsDropdownOpen, setNewsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [showCategorySuggestions, setShowCategorySuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const newsDropdownRef = useRef<HTMLDivElement>(null);
  const categories = db.getCategories();
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);

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

  

  const handleNewsNavigation = (categoryId?: string) => {
    onNavigateToNews(categoryId);
    setNewsDropdownOpen(false);
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
        <div className="flex justify-between h-14 sm:h-16 items-center gap-8">
          {/* Left: Logo & Date */}
          <div className="flex flex-col items-start">
            <div
              onClick={() => onNavigate('HOME')}
              onTouchStart={() => onNavigate('HOME')}
              onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('HOME'); }}
              role="button"
              tabIndex={0}
              className="text-lg sm:text-2xl font-black text-indigo-600 tracking-tighter flex-shrink-0 cursor-pointer select-none"
            >
              The Terai Times
            </div>
            <span className="text-xs sm:text-sm text-gray-500 font-medium">
              {formatCurrentDate()}
            </span>
          </div>

          {/* Center: Slogan */}
          <div className="flex-1 text-center">
            <span className="text-lg font-medium text-red-600"><h1><b>"सबैको आवाज, आवाज एकसाथ"
            </b></h1></span>
            <span className="text-lg font-medium text-gray-600"><b>From Plain To Peak</b></span>
          </div>

          {/* Right: Categories, Sign In, Admin */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCategoryDrawerOpen(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition"
            >
              Categories
            </button>

            {isAuthenticated ? (
              <button 
                onClick={() => onNavigate('PROFILE')}
                className="flex items-center gap-2 py-2 px-3 rounded-full border border-gray-200 hover:bg-gray-50 transition"
              >
                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-bold">
                  {user?.name.charAt(0)}
                </div>
                <span className="text-sm font-semibold">{user?.name}</span>
              </button>
            ) : (
              <button 
                onClick={() => onNavigate('LOGIN')}
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold border border-indigo-200 hover:bg-indigo-50 transition"
              >
                Sign In
              </button>
            )}

            {isAuthenticated && user?.role === 'ADMIN' && (
              <button
                onClick={() => onNavigate('ADMIN')}
                className="ml-2 px-3 py-2 text-sm font-semibold text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition"
              >
                Admin
              </button>
            )}
          </div>

          {/* single Categories button used for both desktop and mobile; no separate mobile toggler */}
        </div>

        {/* Category buttons row */}
        <div className="hidden md:flex items-center gap-6 mt-2 pb-3">
          {categories.slice(0, 6).map((category) => (
            <button
              key={category.id}
              onClick={() => onNavigateToNews(category.id)}
              className="font-medium text-sm transition text-gray-500 hover:text-indigo-600"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {/* mobile menu removed; categories accessible via the Categories button which opens the CategoryDrawer */}

      <CategoryDrawer
        open={categoryDrawerOpen}
        onClose={() => setCategoryDrawerOpen(false)}
        onSelectCategory={(id) => {
          onNavigateToNews(id);
          setCategoryDrawerOpen(false);
        }}
      />
    </nav>
  );
};

export default Navbar;
