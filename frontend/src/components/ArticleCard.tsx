import React from 'react';
import { Article } from '../types/article';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
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
    <article 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className="relative h-48">
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
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {article.Category}
          </span>
          <span className="text-sm text-gray-500">
            {new Date(article.Date_of_publication).toLocaleDateString()}
          </span>
        </div>
        <h2 className="text-xl font-semibold mb-2">{article.Title}</h2>
        <p className="text-gray-600">{article.Description}</p>
      </div>
    </article>
  );
};

export default ArticleCard;