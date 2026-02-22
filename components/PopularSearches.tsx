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

 
};

export default PopularSearches;
