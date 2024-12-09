import React from 'react';
import { ArticleDetail as ArticleDetailType } from '../types/article';
import { ArrowLeft } from 'lucide-react';

const translations = {
  en: {
    backToArticles: "Back to Articles"
  },
  fr: {
    backToArticles: "Retour aux Articles"
  },
  es: {
    backToArticles: "Volver a los Artículos"
  }
};

interface ArticleDetailProps {
  article: ArticleDetailType;
  onBack: () => void;
  onCategoryClick: (category: string) => void;
  language: string;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({
  article, 
  onBack,
  onCategoryClick,
  language
}) => {
  const getImageUrl = (imagePath: string | null) => {
    if (!imagePath) return '/placeholder-image.jpg';
    
    // If it's already a URL, return as is
    if (imagePath.startsWith('http')) return imagePath;
    
    // If it's a Windows path, extract the image name
    if (imagePath.includes('\\')) {
      const parts = imagePath.split('\\');
      const imageName = parts[parts.length - 1];
      return `/images/${imageName}`;
    }
    
    // If it's a relative path, use as is
    return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {translations[language as keyof typeof translations]?.backToArticles || translations.en.backToArticles}
        </button>
      </div>

      <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img
            src={getImageUrl(article.imagePath)}
            alt={article.Title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-image.jpg';
            }}
          />
        </div>

        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => onCategoryClick(article.Category)}
              className="px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            >
              {article.Category}
            </button>
            <time className="text-gray-500 dark:text-gray-400 text-sm">
              {new Date(article.Date_of_publication).toLocaleDateString()}
            </time>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {article.Title}
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
              {article.Description}
            </p>
            <div className="space-y-6 text-gray-700 dark:text-gray-200">
              {article.Content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;