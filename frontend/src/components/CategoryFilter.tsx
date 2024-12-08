import React from 'react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  onCategoryChange,
  categories 
}) => {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto py-2">
      <button
        onClick={() => onCategoryChange('All')}
        className={`px-4 py-2 rounded-full ${
          selectedCategory === 'All'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === category
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;