import React, { useState, useEffect } from 'react';

interface TagFilterProps {
  availableTags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  maxTags?: number;
}

const TagFilter: React.FC<TagFilterProps> = ({ availableTags, selectedTags, onTagsChange, maxTags = 5 }) => {
  const [expanded, setExpanded] = useState(false);

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length < maxTags) {
        onTagsChange([...selectedTags, tag]);
      }
    }
  };

  const handleClearAll = () => {
    onTagsChange([]);
  };

  const visibleTags = expanded ? availableTags : availableTags.slice(0, 8);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900">🏷️ Filter by Tags</h3>
        {selectedTags.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {visibleTags.map(tag => (
          <button
            key={tag}
            onClick={() => handleTagToggle(tag)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
              selectedTags.includes(tag)
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tag}
            {selectedTags.includes(tag) && <span className="ml-1">✓</span>}
          </button>
        ))}
      </div>

      {availableTags.length > 8 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
        >
          {expanded ? 'Show Less' : `Show More (${availableTags.length - 8})`}
        </button>
      )}

      {selectedTags.length > 0 && (
        <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Selected:</span> {selectedTags.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default TagFilter;
