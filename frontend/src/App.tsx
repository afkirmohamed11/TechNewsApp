import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ArticleCard from './components/ArticleCard';
import ArticleDetail from './components/ArticleDetail';
import ArticleFilters from './components/ArticleFilters';
import Footer from './components/Footer';
import { Article, ArticleDetail as ArticleDetailType } from './types/article';
import { api } from './services/api';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<ArticleDetailType | null>(null);
  const [viewType, setViewType] = useState<'latest' | 'popular'>('latest');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory, viewType]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      let fetchedArticles;
      
      if (selectedCategory === 'All') {
        // For All category, first get all articles
        fetchedArticles = await api.getAllArticles();
        
        // Filter based on viewType
        if (viewType === 'latest') {
          // For latest, only show articles where Latest is true
          fetchedArticles = fetchedArticles
            .filter(article => article.Latest)
            .sort((a, b) => 
              new Date(b.Date_of_publication).getTime() - new Date(a.Date_of_publication).getTime()
            );
        } else {
          // For popular, only show articles where Latest is false
          fetchedArticles = fetchedArticles
            .filter(article => !article.Latest)
            .sort((a, b) => 
              new Date(b.Date_of_publication).getTime() - new Date(a.Date_of_publication).getTime()
            );
        }
      } else {
        // For specific categories, use the category and sort endpoint
        fetchedArticles = await api.getArticlesByCategoryAndSort(
          selectedCategory,
          viewType === 'latest'
        );
      }
      
      setArticles(fetchedArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles([]); // Set empty array on error
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
  };

  const NoArticlesMessage = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 mb-8 text-gray-300">
        <svg
          className="w-full h-full"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15M9 11l3 3m0 0l3-3m-3 3V8"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
        No Articles Found
      </h3>
      <p className="text-gray-500 text-center max-w-md mb-6">
        {selectedCategory === 'All'
          ? `We couldn't find any ${viewType} articles at the moment. Please check back later!`
          : `We couldn't find any ${viewType} articles in ${selectedCategory}. Try a different category or view type!`
        }
      </p>
      <button
        onClick={handleHomeClick}
        className="px-6 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        Back to Home
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onCategorySelect={handleCategoryClick}
        onHomeClick={handleHomeClick}
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
            />
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : articles.length === 0 ? (
              <NoArticlesMessage />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map(article => (
                  <ArticleCard
                    key={`${article.Title}-${article.Description}`}
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