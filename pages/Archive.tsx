import React, { useState, useMemo } from 'react';
import { db } from '../db';
import NewsCard from '../components/NewsCard';
import SidebarAds from '../components/SidebarAds';

interface ArchiveProps {
  onNavigateDetail: (id: string) => void;
}

const Archive: React.FC<ArchiveProps> = ({ onNavigateDetail }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 9;

  const allNews = db.getNews();

  // Get unique months and years
  const dateMap = useMemo(() => {
    const map = new Map<number, Set<number>>();

    allNews.forEach((article) => {
      const date = new Date(article.createdAt);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (!map.has(year)) {
        map.set(year, new Set());
      }
      map.get(year)?.add(month);
    });

    return map;
  }, [allNews]);

  const years = Array.from(dateMap.keys()).sort((a, b) => b - a);
  const months = selectedYear && dateMap.get(selectedYear) 
    ? Array.from(dateMap.get(selectedYear)!).sort((a, b) => b - a)
    : [];

  const filteredNews = useMemo(() => {
    if (!selectedMonth || !selectedYear) {
      return allNews;
    }

    const [year, month] = selectedMonth.split('-').map(Number);
    return allNews.filter((article) => {
      const date = new Date(article.createdAt);
      return date.getFullYear() === year && date.getMonth() + 1 === month;
    });
  }, [allNews, selectedMonth, selectedYear]);

  const displayedNews = filteredNews.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(filteredNews.length / pageSize);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedMonth, selectedYear]);

  const monthNames = [
    '', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-3 space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">News Archive</h1>
        <p className="text-gray-600">Browse news stories by date</p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-8 rounded-xl">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">Year</label>
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(Number(e.target.value));
              setSelectedMonth('');
            }}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">Month</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            disabled={!selectedYear}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:opacity-50"
          >
            <option value="">All Months</option>
            {months.map((month) => (
              <option key={month} value={`${selectedYear}-${month}`}>
                {monthNames[month]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedMonth
              ? `${monthNames[parseInt(selectedMonth.split('-')[1])]} ${selectedYear}`
              : selectedYear
              ? `${selectedYear}`
              : 'All Articles'}
          </h2>
          <span className="text-gray-600 text-sm">
            {filteredNews.length} {filteredNews.length === 1 ? 'article' : 'articles'}
            {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
          </span>
        </div>

        {displayedNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedNews.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                onClick={onNavigateDetail}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-gray-600">
            <p>No articles found for the selected period.</p>
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

      {/* Timeline View */}
      <section className="mt-16 pt-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Timeline</h2>
        <div className="space-y-4">
          {Array.from(dateMap.entries())
            .sort((a, b) => b[0] - a[0])
            .map(([year, monthSet]) => (
              <div key={year}>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{year}</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {months.map((month) => {
                    const articlesInMonth = allNews.filter((a) => {
                      const date = new Date(a.createdAt);
                      return date.getFullYear() === year && date.getMonth() + 1 === month;
                    });

                    return (
                      <button
                        key={`${year}-${month}`}
                        onClick={() => setSelectedMonth(`${year}-${month}`)}
                        className={`py-2 px-3 rounded-lg text-sm font-bold transition ${
                          selectedMonth === `${year}-${month}`
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white border border-gray-200 text-gray-700 hover:border-indigo-400'
                        }`}
                      >
                        <div>{monthNames[month].slice(0, 3)}</div>
                        <div className="text-xs opacity-75">{articlesInMonth.length}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      </section>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1">
        <SidebarAds />
      </div>
    </div>
  );
};

export default Archive;
