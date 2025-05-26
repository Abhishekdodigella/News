import React from 'react';
import { Article } from '../../types';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

interface ArticleCardProps {
  article: Article;
  isCompact?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, isCompact = false }) => {
  const { user, saveArticleToFavorites, removeArticleFromFavorites } = useAuth();
  
  const isSaved = user?.savedArticles.includes(article.id);
  
  const handleSaveToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) return;
    
    try {
      if (isSaved) {
        await removeArticleFromFavorites(article.id);
      } else {
        await saveArticleToFavorites(article.id);
      }
    } catch (error) {
      console.error('Error toggling save status:', error);
    }
  };
  
  // Format the date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };
  
  if (isCompact) {
    return (
      <Link to={`/article/${article.id}`} className="block">
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden h-full">
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800 mb-2">
                  {article.category}
                </span>
                <span className="text-xs text-gray-500 ml-2">{formatDate(article.publishedAt)}</span>
              </div>
              {user && (
                <button
                  onClick={handleSaveToggle}
                  className="text-gray-400 hover:text-amber-500 transition-colors duration-200"
                  aria-label={isSaved ? "Remove from saved articles" : "Save article"}
                >
                  {isSaved ? <BookmarkCheck className="h-5 w-5 text-amber-500" /> : <Bookmark className="h-5 w-5" />}
                </button>
              )}
            </div>
            <h3 className="font-bold text-gray-900 mt-1 line-clamp-2">{article.title}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {article.source} • {article.author}
            </p>
          </div>
        </div>
      </Link>
    );
  }
  
  return (
    <Link to={`/article/${article.id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden h-full">
        <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-48 object-cover object-center transform hover:scale-105 transition-transform duration-200"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800 mb-2">
                {article.category}
              </span>
              <span className="text-xs text-gray-500 ml-2">{formatDate(article.publishedAt)}</span>
            </div>
            {user && (
              <button
                onClick={handleSaveToggle}
                className="text-gray-400 hover:text-amber-500 transition-colors duration-200"
                aria-label={isSaved ? "Remove from saved articles" : "Save article"}
              >
                {isSaved ? <BookmarkCheck className="h-5 w-5 text-amber-500" /> : <Bookmark className="h-5 w-5" />}
              </button>
            )}
          </div>
          <h3 className="font-bold text-gray-900 mt-1 text-lg">{article.title}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {article.source} • {article.author}
          </p>
          <p className="text-sm text-gray-700 mt-2 line-clamp-2">{article.summary}</p>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;