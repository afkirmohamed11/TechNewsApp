import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ArticleCard from './components/ArticleCard';
import ArticleDetail from './components/ArticleDetail';
import ArticleFilters from './components/ArticleFilters';
import Footer from './components/Footer';
import { Article, ArticleDetail as ArticleDetailType } from './types/article';
import { api } from './services/api';
import debounce from 'lodash/debounce';
import { FileDown, Home, ArrowLeft } from 'lucide-react';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<ArticleDetailType | null>(null);
  const [viewType, setViewType] = useState<'latest' | 'popular' | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [language, setLanguage] = useState('en');

  const translations = {
    en: {
      noArticlesTitle: "No Articles Found",
      noArticlesCategory: "We couldn't find any {category} articles. Try a different category or view type!",
      noArticlesSearch: "We couldn't find any articles matching \"{term}\". Try a different search term!",
      backToHome: "Back to Home",
      backToArticles: "Back to Articles"
    },
    fr: {
      noArticlesTitle: "Aucun Article Trouvé",
      noArticlesCategory: "Nous n'avons trouvé aucun article dans la catégorie {category}. Essayez une autre catégorie ou un autre type de vue !",
      noArticlesSearch: "Nous n'avons trouvé aucun article correspondant à \"{term}\". Essayez un autre terme de recherche !",
      backToHome: "Retour à l'Accueil",
      backToArticles: "Retour aux Articles"
    },
    es: {
      noArticlesTitle: "No se Encontraron Artículos",
      noArticlesCategory: "No pudimos encontrar ningún artículo de {category}. ¡Prueba una categoría diferente o un tipo de vista diferente!",
      noArticlesSearch: "No pudimos encontrar ningún artículo que coincida con \"{term}\". ¡Intenta con otro término de búsqueda!",
      backToHome: "Volver al Inicio",
      backToArticles: "Volver a los Artículos"
    }
  };

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
        if (viewType === null) {
          // When no filter is selected, get all articles for the category
          fetchedArticles = await api.getArticlesByCategory(selectedCategory);
        } else {
          // When a filter is selected, get filtered articles
          fetchedArticles = await api.getArticlesByCategoryAndSort(
            selectedCategory,
            viewType === 'latest'
          );
        }
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

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  const NoArticlesMessage = ({ searchTerm, category }: { searchTerm?: string, category?: string }) => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {translations[language as keyof typeof translations]?.noArticlesTitle || translations.en.noArticlesTitle}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {searchTerm 
            ? (translations[language as keyof typeof translations]?.noArticlesSearch || translations.en.noArticlesSearch).replace('{term}', searchTerm)
            : (translations[language as keyof typeof translations]?.noArticlesCategory || translations.en.noArticlesCategory).replace('{category}', category || '')
          }
        </p>
      </div>
      <button
        onClick={handleHomeClick}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        {translations[language as keyof typeof translations]?.backToHome || translations.en.backToHome}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header 
        onCategorySelect={handleCategoryClick}
        onHomeClick={handleHomeClick}
        onSearch={handleSearch}
        onLanguageChange={handleLanguageChange}
      />
      
      <main className="container mx-auto px-4 py-8">
        {selectedArticle ? (
          <ArticleDetail
            article={selectedArticle}
            onBack={() => setSelectedArticle(null)}
            onCategoryClick={handleCategoryClick}
            language={language}
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
              <NoArticlesMessage searchTerm={searchTerm} category={selectedCategory} />
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
      <Footer language={language} />
    </div>
  );
}

export default App;