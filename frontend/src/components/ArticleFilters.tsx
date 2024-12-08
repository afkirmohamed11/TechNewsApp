import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

interface ArticleFiltersProps {
  viewType: 'latest' | 'popular';
  setViewType: (type: 'latest' | 'popular') => void;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const ArticleFilters: React.FC<ArticleFiltersProps> = ({
  viewType,
  setViewType,
  selectedCategory,
  onCategorySelect,
}) => {
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await api.getCategories();
        setCategories(['All', ...fetchedCategories]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedCategory === 'All' ? 'All Articles' : selectedCategory}
          </h2>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setViewType('latest')}
            className={`px-6 py-2.5 rounded-full text-base font-medium transition-all duration-200 ease-in-out transform hover:scale-105 ${
              viewType === 'latest'
                ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Latest
          </button>
          <button
            onClick={() => setViewType('popular')}
            className={`px-6 py-2.5 rounded-full text-base font-medium transition-all duration-200 ease-in-out transform hover:scale-105 ${
              viewType === 'popular'
                ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Popular
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 bg-gray-50 p-4 rounded-xl shadow-sm">
        {loading ? (
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-gray-200 h-10 w-24 rounded-full"></div>
            ))}
          </div>
        ) : (
          categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gray-800 text-white shadow-md hover:bg-gray-900'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900'
              }`}
            >
              {category}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default ArticleFilters;