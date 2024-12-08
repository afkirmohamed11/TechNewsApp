import React from 'react';
import { ArticleDetail as ArticleDetailType } from '../types/article';
import { ArrowLeft } from 'lucide-react';

interface ArticleDetailProps {
  article: ArticleDetailType;
  onBack: () => void;
  onCategoryClick: (category: string) => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ 
  article, 
  onBack,
  onCategoryClick 
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
    <div className="max-w-4xl mx-auto py-8 px-4">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Articles
      </button>
      
      <article>
        <h1 className="text-4xl font-bold mb-4">{article.Title}</h1>
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => onCategoryClick(article.Category)}
            className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
          >
            {article.Category}
          </button>
          <span className="text-gray-500">
            {new Date(article.Date_of_publication).toLocaleDateString()}
          </span>
        </div>
        
        <div className="relative h-[400px] mb-8">
          <img
            src={getImageUrl(article.imagePath)}
            alt={article.Title}
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-image.jpg';
            }}
          />
        </div>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 leading-relaxed">
            {article.Content}
          </p>
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;