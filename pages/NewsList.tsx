
import React, { useState, useMemo } from 'react';
import { db } from '../db';
import { NewsArticle, Category } from '../types';
import NewsCard from '../components/NewsCard';
import SidebarAds from '../components/SidebarAds';
import TagFilter from '../components/TagFilter';

interface NewsListProps {
  onNavigateDetail: (id: string) => void;
  categoryId?: string | null;
  initialSearch?: string;
  onSearchChange?: (query: string) => void;
}

const NewsList: React.FC<NewsListProps> = ({ onNavigateDetail, categoryId, initialSearch = '', onSearchChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('date');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const pageSize = 9;
  
  const news = db.getNews();
  const categories = db.getCategories();

  // Sync selectedCategory when navigated from navbar
  React.useEffect(() => {
    if (categoryId) setSelectedCategory(categoryId);
    else setSelectedCategory('ALL');
  }, [categoryId]);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, dateFrom, dateTo, sortBy, selectedTags]);

  const filteredNews = useMemo(() => {
    let filtered = news.filter(n => {
      const categoryMatch = selectedCategory === 'ALL' || n.categoryId === selectedCategory;
      const searchMatch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          n.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const dateMatch = (!dateFrom || new Date(n.createdAt) >= new Date(dateFrom)) &&
                        (!dateTo || new Date(n.createdAt) <= new Date(dateTo));
      const tagMatch = selectedTags.length === 0 || 
                       selectedTags.some(selectedTag => n.tags?.includes(selectedTag));
      return categoryMatch && searchMatch && dateMatch && tagMatch;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'views':
          return (b.views || 0) - (a.views || 0);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [news, selectedCategory, searchQuery, dateFrom, dateTo, sortBy, selectedTags]);

  const displayedNews = filteredNews.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(filteredNews.length / pageSize);

  // Get all unique tags from news articles
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    news.forEach(article => {
      article.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [news]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-3 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Explore News</h1>
          <p className="text-gray-500">Stay updated with deep dives and quick updates</p>
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search articles..." 
            className="pl-10 pr-10 py-3 rounded-xl border border-gray-200 w-full md:w-80 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            value={searchQuery}
            onChange={(e) => {
              const q = e.target.value;
              setSearchQuery(q);
              onSearchChange?.(q);
            }}
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                onSearchChange?.('');
              }}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
          <input 
            type="date" 
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
          <input 
            type="date" 
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
        {(dateFrom || dateTo) && (
          <button 
            onClick={() => { setDateFrom(''); setDateTo(''); }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Clear Dates
          </button>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="date">Date (Newest)</option>
            <option value="views">Most Viewed</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 py-2">
        <button 
          onClick={() => setSelectedCategory('ALL')}
          className={`px-4 py-2 rounded-full text-sm font-bold transition ${selectedCategory === 'ALL' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-indigo-400'}`}
        >
          All News
        </button>
        {categories.map(cat => (
          <button 
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition ${selectedCategory === cat.id ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-indigo-400'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Tag Filter */}
      {availableTags.length > 0 && (
        <TagFilter 
          availableTags={availableTags}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
          maxTags={8}
        />
      )}

      <div className="text-sm text-gray-600">
        {filteredNews.length} article{filteredNews.length !== 1 ? 's' : ''} found
        {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
      </div>

      {displayedNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedNews.map(article => (
            <NewsCard key={article.id} article={article} onClick={onNavigateDetail} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900">No results found</h3>
          <p className="text-gray-500">Try adjusting your filters or search terms.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => {
              setCurrentPage(1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            First
          </button>
          
          <button
            onClick={() => {
              setCurrentPage(prev => Math.max(1, prev - 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &lt; Prev
          </button>

          {/* Page numbers */}
          {(() => {
            const pages = [];
            const startPage = Math.max(1, currentPage - 2);
            const endPage = Math.min(totalPages, currentPage + 2);
            
            if (startPage > 1) {
              pages.push(
                <button
                  key={1}
                  onClick={() => {
                    setCurrentPage(1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  1
                </button>
              );
              if (startPage > 2) {
                pages.push(<span key="dots1" className="px-2 text-gray-400">.....</span>);
              }
            }

            for (let i = startPage; i <= endPage; i++) {
              pages.push(
                <button
                  key={i}
                  onClick={() => {
                    setCurrentPage(i);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    i === currentPage
                      ? 'text-indigo-600 bg-indigo-50 border border-indigo-500'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {i}
                </button>
              );
            }

            if (endPage < totalPages) {
              if (endPage < totalPages - 1) {
                pages.push(<span key="dots2" className="px-2 text-gray-400">.....</span>);
              }
              pages.push(
                <button
                  key={totalPages}
                  onClick={() => {
                    setCurrentPage(totalPages);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  {totalPages}
                </button>
              );
            }

            return pages;
          })()}

          <button
            onClick={() => {
              setCurrentPage(prev => Math.min(totalPages, prev + 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1">
        <SidebarAds />
      </div>
    </div>
  );
};

export default NewsList;
