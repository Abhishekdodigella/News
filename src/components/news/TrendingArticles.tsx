import React from 'react';
import { Article } from '../../types';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

interface TrendingArticlesProps {
  articles: Article[];
  isLoading?: boolean;
}

const TrendingArticles: React.FC<TrendingArticlesProps> = ({ articles, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex items-center mb-4">
          <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        </div>
        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center animate-pulse">
              <div className="h-4 w-4 rounded-full bg-gray-200 mr-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex items-center mb-4">
        <TrendingUp className="text-amber-500 mr-2" />
        <h2 className="text-lg font-bold text-gray-900">Trending Now</h2>
      </div>
      <div className="space-y-3">
        {articles.map((article, index) => (
          <Link 
            key={article.id}
            to={`/article/${article.id}`}
            className="flex items-start group"
          >
            <span className="font-semibold text-amber-500 mr-2">{index + 1}.</span>
            <p className="text-gray-700 group-hover:text-blue-800 transition-colors duration-200">
              {article.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingArticles;