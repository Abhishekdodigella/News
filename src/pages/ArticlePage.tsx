import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bookmark, BookmarkCheck, Clock, Globe } from 'lucide-react';
import { Article } from '../types';
import { getArticleById } from '../services/localStorage';
import { useAuth } from '../context/AuthContext';
import ArticleList from '../components/news/ArticleList';
import { useNews } from '../context/NewsContext';

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, saveArticleToFavorites, removeArticleFromFavorites } = useAuth();
  const { articles } = useNews();
  const navigate = useNavigate();
  
  const isSaved = user?.savedArticles.includes(id || '');
  
  useEffect(() => {
    if (id) {
      const foundArticle = getArticleById(id);
      setArticle(foundArticle || null);
      setLoading(false);
    }
  }, [id]);
  
  const handleSaveToggle = async () => {
    if (!user || !id) return;
    
    try {
      if (isSaved) {
        await removeArticleFromFavorites(id);
      } else {
        await saveArticleToFavorites(id);
      }
    } catch (error) {
      console.error('Error toggling save status:', error);
    }
  };
  
  // Format the date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };
  
  // Get related articles
  const getRelatedArticles = (): Article[] => {
    if (!article) return [];
    
    return articles
      .filter(a => a.category === article.category && a.id !== article.id)
      .slice(0, 3);
  };
  
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="h-64 bg-gray-200 rounded w-full mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }
  
  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h2>
        <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </button>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-gray-700 hover:text-blue-800 transition-colors duration-200"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back
            </button>
          </div>
          
          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <span className="inline-block px-3 py-1 bg-blue-800 text-white text-sm font-medium rounded-full">
                  {article.category}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center text-gray-600">
                  <span className="font-medium text-gray-800">{article.source}</span>
                  <span className="mx-2">•</span>
                  <span>{article.author}</span>
                  <span className="mx-2">•</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
                
                {user && (
                  <button
                    onClick={handleSaveToggle}
                    className={`flex items-center ${
                      isSaved ? 'text-amber-500' : 'text-gray-500 hover:text-amber-500'
                    } transition-colors duration-200`}
                    aria-label={isSaved ? "Remove from saved articles" : "Save article"}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="h-5 w-5 mr-1" />
                    ) : (
                      <Bookmark className="h-5 w-5 mr-1" />
                    )}
                    <span>{isSaved ? 'Saved' : 'Save'}</span>
                  </button>
                )}
              </div>
              
              <div className="prose max-w-none mb-6">
                <p className="text-lg font-medium text-gray-800 mb-4">{article.summary}</p>
                <p className="text-gray-700 whitespace-pre-line">{article.content}</p>
              </div>
              
              <div className="border-t border-gray-200 pt-6 mt-6">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-800 hover:text-blue-700 transition-colors duration-200"
                >
                  <Globe className="h-4 w-4 mr-1" />
                  Read full article at {article.source}
                </a>
              </div>
            </div>
          </article>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">More from {article.category}</h2>
            <ArticleList articles={getRelatedArticles()} compact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;