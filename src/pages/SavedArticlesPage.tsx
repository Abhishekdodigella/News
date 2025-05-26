import React from 'react';
import { Link } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import { useAuth } from '../context/AuthContext';
import ArticleList from '../components/news/ArticleList';
import SearchBar from '../components/ui/SearchBar';
import { Bookmark } from 'lucide-react';

const SavedArticlesPage: React.FC = () => {
  const { savedArticles, loading } = useNews();
  const { isAuthenticated } = useAuth();
  
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredArticles, setFilteredArticles] = React.useState(savedArticles);
  
  React.useEffect(() => {
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      setFilteredArticles(
        savedArticles.filter(
          article => 
            article.title.toLowerCase().includes(lowerSearchTerm) || 
            article.summary.toLowerCase().includes(lowerSearchTerm)
        )
      );
    } else {
      setFilteredArticles(savedArticles);
    }
  }, [savedArticles, searchTerm]);
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };
  
  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Bookmark className="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Sign in to see your saved articles</h2>
        <p className="text-gray-600 mb-8">You need to be logged in to save and view your favorite articles.</p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-white border border-blue-800 text-blue-800 rounded-md hover:bg-blue-50 transition-colors duration-200"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Sign Up
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Articles</h1>
        <p className="text-gray-600">Articles you've bookmarked for later</p>
      </div>
      
      <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
      
      {searchTerm && (
        <div className="mb-6">
          <p className="text-gray-700">
            Showing results for "{searchTerm}" in your saved articles
          </p>
          {filteredArticles.length > 0 && (
            <p className="text-gray-500">{filteredArticles.length} articles found</p>
          )}
        </div>
      )}
      
      <ArticleList 
        articles={filteredArticles} 
        isLoading={loading} 
        emptyMessage={
          savedArticles.length === 0
            ? "You haven't saved any articles yet. Browse articles and click the bookmark icon to save them for later."
            : searchTerm
              ? `No saved articles match "${searchTerm}"`
              : "No saved articles found"
        } 
      />
    </div>
  );
};

export default SavedArticlesPage;