import React, { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';

interface HeaderProps {
  onCategorySelect: (category: string) => void;
  onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCategorySelect, onHomeClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number>();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await api.getCategories();
        setCategories(['All', ...fetchedCategories]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 300); // Small delay before closing to make it feel smoother
  };

  return (
    <header className="bg-blue-600 shadow-lg">
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #999;
          }
          .dropdown-content {
            transform-origin: top;
            transition: transform 0.2s ease-out, opacity 0.2s ease-out;
          }
          .dropdown-enter {
            opacity: 0;
            transform: scaleY(0.95);
          }
          .dropdown-enter-active {
            opacity: 1;
            transform: scaleY(1);
          }
        `}
      </style>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 
            onClick={onHomeClick}
            className="text-2xl font-bold text-white cursor-pointer hover:text-blue-100 transition-colors duration-200"
          >
            Tech News Platform
          </h1>
          <div 
            className="relative" 
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-4 py-2 text-white hover:bg-blue-700 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Categories
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  isOpen ? 'transform rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl z-50 dropdown-content"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="py-2 max-h-[70vh] overflow-y-auto custom-scrollbar">
                  {categories.map((category, index) => (
                    <button
                      key={category}
                      onClick={() => {
                        onCategorySelect(category);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 flex items-center gap-3
                        ${index !== categories.length - 1 ? 'border-b border-gray-100' : ''}
                        ${index === 0 ? 'rounded-t-xl' : ''}
                        ${index === categories.length - 1 ? 'rounded-b-xl' : ''}
                      `}
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-600 opacity-0 transition-opacity duration-200 transform scale-0 group-hover:opacity-100 group-hover:scale-100"></span>
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;