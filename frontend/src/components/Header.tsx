import React, { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import { Search, Moon, Sun, Globe, ChevronDown } from 'lucide-react';

const translations = {
  en: {
    search: "Search articles...",
    categories: "Categories",
    all: "All"
  },
  fr: {
    search: "Rechercher des articles...",
    categories: "Catégories",
    all: "Tout"
  },
  es: {
    search: "Buscar artículos...",
    categories: "Categorías",
    all: "Todo"
  }
};

interface HeaderProps {
  onCategorySelect: (category: string) => void;
  onHomeClick: () => void;
  onSearch?: (term: string) => void;
  onLanguageChange: (lang: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onCategorySelect, onHomeClick, onSearch, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number>();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
  ];

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

    // Load dark mode preference from localStorage
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
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
    }, 300);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', (!isDarkMode).toString());
  };

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    setIsLangMenuOpen(false);
    localStorage.setItem('language', langCode);
    onLanguageChange(langCode);
  };

  return (
    <header className="bg-blue-600 dark:bg-gray-800 shadow-lg">
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
        <div className="flex items-center justify-between gap-4">
          <h1 
            onClick={onHomeClick}
            className="text-2xl font-bold text-white cursor-pointer hover:text-blue-100 transition-colors duration-200 whitespace-nowrap"
          >
            Tech News Platform
          </h1>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-xl mx-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (onSearch) {
                  onSearch(e.target.value);
                }
              }}
              placeholder={translations[language as keyof typeof translations]?.search || translations.en.search}
              className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-blue-400 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white/90 dark:bg-gray-700 dark:text-white"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          <div className="flex items-center gap-4">
            {/* Categories Dropdown */}
            <div 
              className="relative" 
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 text-white hover:bg-blue-700 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              >
                {translations[language as keyof typeof translations]?.categories || translations.en.categories}
                <svg
                  className={`inline-block w-4 h-4 ml-2 transition-transform duration-200 ${
                    isOpen ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl z-50 dropdown-content"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="py-2 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <button
                      onClick={() => {
                        onCategorySelect('All');
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center gap-3
                        rounded-t-xl
                      `}
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-600 opacity-0 transition-opacity duration-200 transform scale-0 group-hover:opacity-100 group-hover:scale-100"></span>
                      {translations[language as keyof typeof translations]?.all || translations.en.all}
                    </button>
                    {categories.slice(1).map((category, index) => (
                      <button
                        key={category}
                        onClick={() => {
                          onCategorySelect(category);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center gap-3
                          ${index !== categories.length - 2 ? 'border-b border-gray-100 dark:border-gray-700' : ''}
                          ${index === categories.length - 2 ? 'rounded-b-xl' : ''}
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

            {/* Language Selector */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-blue-600/50 rounded-lg transition-colors"
                onMouseEnter={() => setIsLangMenuOpen(true)}
                onMouseLeave={() => setIsLangMenuOpen(false)}
              >
                <Globe className="w-5 h-5" />
                <span>{languages.find(lang => lang.code === language)?.name}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50"
                  onMouseEnter={() => setIsLangMenuOpen(true)}
                  onMouseLeave={() => setIsLangMenuOpen(false)}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        language === lang.code 
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' 
                          : 'text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-white hover:bg-blue-700 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;