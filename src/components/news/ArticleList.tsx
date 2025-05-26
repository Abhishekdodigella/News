import React from 'react';
import { Article } from '../../types';
import ArticleCard from './ArticleCard';

interface ArticleListProps {
  articles: Article[];
  isLoading?: boolean;
  emptyMessage?: string;
  compact?: boolean;
}

const ArticleList: React.FC<ArticleListProps> = ({ 
  articles, 
  isLoading = false, 
  emptyMessage = "No articles found", 
  compact = false 
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            {!compact && (
              <div className="bg-gray-200 h-48 w-full rounded-t-lg"></div>
            )}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-4"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded mt-2"></div>
              <div className="h-4 bg-gray-200 rounded mt-2 w-3/4"></div>
              {!compact && (
                <div className="h-16 bg-gray-200 rounded mt-2"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map(article => (
        <ArticleCard key={article.id} article={article} isCompact={compact} />
      ))}
    </div>
  );
};

export default ArticleList;