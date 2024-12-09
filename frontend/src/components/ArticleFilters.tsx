import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const translations = {
  en: {
    latest: "Latest",
    popular: "Popular",
    all: "All"
  },
  fr: {
    latest: "Récent",
    popular: "Populaire",
    all: "Tout"
  },
  es: {
    latest: "Reciente",
    popular: "Popular",
    all: "Todo"
  }
};

interface ArticleFiltersProps {
  viewType: 'latest' | 'popular' | null;
  setViewType: (type: 'latest' | 'popular' | null) => void;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  language: string;
}

const ArticleFilters: React.FC<ArticleFiltersProps> = ({
  viewType,
  setViewType,
  selectedCategory,
  onCategorySelect,
  language
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

  const handleViewTypeClick = (type: 'latest' | 'popular') => {
    setViewType(viewType === type ? null : type);
  };

  const getCategoryDisplayName = (category: string) => {
    return category === 'All' 
      ? translations[language as keyof typeof translations]?.all || translations.en.all
      : category;
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {getCategoryDisplayName(selectedCategory)}
          </h2>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => handleViewTypeClick('latest')}
            className={`px-6 py-2.5 rounded-full text-base font-medium transition-all duration-200 ease-in-out transform hover:scale-105 ${
              viewType === 'latest'
                ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700'
                : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {translations[language as keyof typeof translations]?.latest || translations.en.latest}
          </button>
          <button
            onClick={() => handleViewTypeClick('popular')}
            className={`px-6 py-2.5 rounded-full text-base font-medium transition-all duration-200 ease-in-out transform hover:scale-105 ${
              viewType === 'popular'
                ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700'
                : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {translations[language as keyof typeof translations]?.popular || translations.en.popular}
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl shadow-sm">
        {loading ? (
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 h-10 w-24 rounded-full"></div>
            ))}
          </div>
        ) : (
          categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gray-800 dark:bg-blue-600 text-white shadow-md hover:bg-gray-900 dark:hover:bg-blue-700'
                  : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {getCategoryDisplayName(category)}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default ArticleFilters;