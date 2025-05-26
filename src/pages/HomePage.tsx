import React, { useEffect } from 'react';
import { useNews } from '../context/NewsContext';
import { useAuth } from '../context/AuthContext';
import ArticleList from '../components/news/ArticleList';
import TrendingArticles from '../components/news/TrendingArticles';
import CategoryFilter from '../components/ui/CategoryFilter';

const HomePage: React.FC = () => {
  const { 
    filteredArticles, 
    trendingArticles, 
    loading, 
    categories, 
    selectedCategory,
    setSelectedCategory,
    refreshArticles
  } = useNews();
  
  const { user } = useAuth();

  useEffect(() => {
    refreshArticles();
  }, []);

  const welcomeMessage = user 
    ? `Welcome back, ${user.name}!` 
    : 'Welcome to NewsHub';

  const subtitle = user && user.preferences.length > 0
    ? "Here's your personalized news feed"
    : "Today's top stories";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{welcomeMessage}</h1>
        <p className="text-gray-600">{subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <CategoryFilter 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />
          
          <ArticleList 
            articles={filteredArticles} 
            isLoading={loading} 
            emptyMessage={
              selectedCategory !== 'All' 
                ? `No articles found in ${selectedCategory} category` 
                : "No articles found"
            } 
          />
        </div>
        
        <div className="lg:col-span-1">
          <TrendingArticles articles={trendingArticles} isLoading={loading} />
          
          {!user && (
            <div className="bg-blue-50 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Get Personalized News</h3>
              <p className="text-gray-700 mb-4">
                Sign up to customize your news feed based on your interests.
              </p>
              <div className="flex space-x-2">
                <a
                  href="/login"
                  className="px-4 py-2 bg-white border border-blue-800 text-blue-800 rounded-md hover:bg-blue-50 transition-colors duration-200 text-sm text-center flex-1"
                >
                  Sign In
                </a>
                <a
                  href="/register"
                  className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm text-center flex-1"
                >
                  Sign Up
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;