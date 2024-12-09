import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ArticleCard from './components/ArticleCard';
import ArticleDetail from './components/ArticleDetail';
import ArticleFilters from './components/ArticleFilters';
import Footer from './components/Footer';
import { Article, ArticleDetail as ArticleDetailType } from './types/article';
import { api } from './services/api';
import debounce from 'lodash/debounce';
import { FileDown, Home } from 'lucide-react';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<ArticleDetailType | null>(null);
  const [viewType, setViewType] = useState<'latest' | 'popular' | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [language, setLanguage] = useState('en'); // Add this line

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchTerm: string, articles: Article[]) => {
      if (!searchTerm.trim()) {
        setFilteredArticles(articles);
        return;
      }
      
      const searchTermLower = searchTerm.toLowerCase();
      const filtered = articles.filter(article =>
        article.Title.toLowerCase().includes(searchTermLower) ||
        (article.Description?.toLowerCase() || '').includes(searchTermLower) ||
        article.Category.toLowerCase().includes(searchTermLower)
      );
      setFilteredArticles(filtered);
    }, 300),
    []
  );

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory, viewType]);

  useEffect(() => {
    debouncedSearch(searchTerm, articles);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, articles, debouncedSearch]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      let fetchedArticles;
      
      if (selectedCategory === 'All') {
        fetchedArticles = await api.getAllArticles();
        
        if (viewType === 'latest') {
          fetchedArticles = fetchedArticles
            .filter(article => article.Latest)
            .sort((a, b) => 
              new Date(b.Date_of_publication).getTime() - new Date(a.Date_of_publication).getTime()
            );
        } else if (viewType === 'popular') {
          fetchedArticles = fetchedArticles
            .filter(article => !article.Latest)
            .sort((a, b) => 
              new Date(b.Date_of_publication).getTime() - new Date(a.Date_of_publication).getTime()
            );
        }
      } else {
        fetchedArticles = await api.getArticlesByCategoryAndSort(
          selectedCategory,
          viewType === 'latest'
        );
      }
      
      setArticles(fetchedArticles);
      // Initialize filtered articles with all articles
      debouncedSearch(searchTerm, fetchedArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles([]);
      setFilteredArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleArticleClick = async (article: Article) => {
    try {
      const articleDetail = await api.getArticleDetail(article.Title, article.Description || '');
      if (articleDetail) {
        setSelectedArticle(articleDetail);
      }
    } catch (error) {
      console.error('Error fetching article detail:', error);
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedArticle(null);
    setSelectedCategory(category);
  };

  const handleHomeClick = () => {
    setSelectedArticle(null);
    setSelectedCategory('All');
    setSearchTerm('');
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const NoArticlesMessage = ({ searchTerm }: { searchTerm: string }) => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-6">
        <FileDown className="w-16 h-16 text-gray-400 dark:text-gray-500" />
      </div>
      <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        No Articles Found
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md">
        {searchTerm
          ? `We couldn't find any articles matching "${searchTerm}". Try a different search term!`
          : `We couldn't find any ${selectedCategory === 'All' ? 'latest' : selectedCategory} articles. Try a different category or view type!`}
      </p>
      <button
        onClick={handleHomeClick}
        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors"
      >
        <Home className="w-5 h-5 mr-2" />
        Back to Home
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header 
        onCategorySelect={handleCategoryClick}
        onHomeClick={handleHomeClick}
        onSearch={handleSearch}
      />
      
      <main className="container mx-auto px-4 py-8">
        {selectedArticle ? (
          <ArticleDetail
            article={selectedArticle}
            onBack={() => setSelectedArticle(null)}
            onCategoryClick={handleCategoryClick}
          />
        ) : (
          <>
            <ArticleFilters
              viewType={viewType}
              setViewType={setViewType}
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategoryClick}
              language={language}
            />
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
              </div>
            ) : filteredArticles.length === 0 ? (
              <NoArticlesMessage searchTerm={searchTerm} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.Title}
                    article={article}
                    onClick={() => handleArticleClick(article)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;