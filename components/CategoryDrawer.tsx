import React from 'react';
import { db } from '../db';
import { Category } from '../types';

interface Props {
  open: boolean;
  onClose: () => void;
  onSelectCategory: (categoryId?: string) => void;
}

const CategoryDrawer: React.FC<Props> = ({ open, onClose, onSelectCategory }) => {
  const categories: Category[] = db.getCategories();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1" onClick={onClose} />
      <aside className="w-4/5 sm:w-2/3 md:w-1/2 bg-white overflow-y-auto shadow-xl">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-indigo-600 font-black text-xl">The Terai Times</div>
          </div>
          <button onClick={onClose} className="text-gray-700 text-2xl font-bold">×</button>
        </div>

        <div className="divide-y divide-gray-200">
          <div className="px-6 py-4 bg-indigo-50">
            <h3 className="text-sm font-bold text-indigo-700 uppercase tracking-wide">Categories</h3>
          </div>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                onClose();
              }}
              className="w-full text-left px-6 py-6 text-lg sm:text-xl font-bold uppercase tracking-wide text-gray-800 hover:bg-gray-50 transition-colors"
            >
              {cat.name}
            </button>
          ))}

          <div className="px-6 py-6">
            <button
              onClick={() => {
                onSelectCategory(undefined);
                onClose();
              }}
              className="w-full text-left text-lg font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              All News
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default CategoryDrawer;