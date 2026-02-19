import React, { useState, useEffect } from 'react';

interface PopularSearchesProps {
  onSearch?: (query: string) => void;
}

const PopularSearches: React.FC<PopularSearchesProps> = ({ onSearch }) => {
  const [searches, setSearches] = useState<Array<{ term: string; count: number }>>([]);

  useEffect(() => {
    // Load popular searches from localStorage
    const savedSearches = localStorage.getItem('search_history');
    if (savedSearches) {
      const history = JSON.parse(savedSearches) as string[];
      const counts: { [key: string]: number } = {};
      
      history.forEach(term => {
        counts[term] = (counts[term] || 0) + 1;
      });
      
      const sorted = Object.entries(counts)
        .map(([term, count]) => ({ term, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8);
      
      setSearches(sorted);
    } else {
      // Default popular searches
      setSearches([
        { term: 'Breaking News', count: 145 },
        { term: 'Technology', count: 98 },
        { term: 'Politics', count: 87 },
        { term: 'Business', count: 76 },
        { term: 'Sports', count: 65 },
        { term: 'Entertainment', count: 54 },
        { term: 'Health', count: 43 },
        { term: 'Opinion', count: 38 }
      ]);
    }
  }, []);

  const handleSearchClick = (term: string) => {
    // Add to search history
    const savedSearches = localStorage.getItem('search_history');
    const history = savedSearches ? JSON.parse(savedSearches) : [];
    history.push(term);
    localStorage.setItem('search_history', JSON.stringify(history.slice(-50)));
    
    if (onSearch) {
      onSearch(term);
    }
  };

  return (
    <section className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-bold text-gray-900 mb-4">📈 Popular Searches</h3>
      <div className="flex flex-wrap gap-2">
        {searches.map((search, index) => (
          <button
            key={search.term}
            onClick={() => handleSearchClick(search.term)}
            className="group relative px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition shadow-sm hover:shadow-md"
          >
            <span className="flex items-center gap-2">
              {search.term}
              <span className="text-xs text-gray-400 group-hover:text-indigo-500 bg-gray-100 group-hover:bg-indigo-100 px-2 py-0.5 rounded-full transition">
                {search.count}
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default PopularSearches;
