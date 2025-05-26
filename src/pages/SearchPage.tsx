import React, { useState, useEffect } from 'react';
import { useNews } from '../context/NewsContext';
import ArticleList from '../components/news/ArticleList';
import SearchBar from '../components/ui/SearchBar';
import CategoryFilter from '../components/ui/CategoryFilter';

const SearchPage: React.FC = () => {
  const { 
    articles, 
    loading, 
    categories, 
    selectedCategory, 
    setSelectedCategory, 
    searchTerm, 
    setSearchTerm 
  } = useNews();
  
  const [searchResults, setSearchResults] = useState(articles);
  const [resultsMessage, setResultsMessage] = useState('');
  
  useEffect(() => {
    // Filter articles based on search term and selected category
    let filtered = [...articles];
    
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        article => 
          article.title.toLowerCase().includes(lowerSearchTerm) || 
          article.summary.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }
    
    setSearchResults(filtered);
    
    // Set appropriate results message
    if (searchTerm && selectedCategory !== 'All') {
      setResultsMessage(`Showing results for "${searchTerm}" in ${selectedCategory}`);
    } else if (searchTerm) {
      setResultsMessage(`Showing results for "${searchTerm}"`);
    } else if (selectedCategory !== 'All') {
      setResultsMessage(`Showing all articles in ${selectedCategory}`);
    } else {
      setResultsMessage('');
    }
  }, [articles, searchTerm, selectedCategory]);
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Articles</h1>
        <p className="text-gray-600">Find specific articles by keyword or category</p>
      </div>
      
      <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
      
      <CategoryFilter 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />
      
      {resultsMessage && (
        <div className="mb-6">
          <p className="text-gray-700">{resultsMessage}</p>
          {searchResults.length > 0 && (
            <p className="text-gray-500">{searchResults.length} articles found</p>
          )}
        </div>
      )}
      
      <ArticleList 
        articles={searchResults} 
        isLoading={loading} 
        emptyMessage={
          searchTerm 
            ? `No articles found matching "${searchTerm}"` 
            : "No articles found"
        } 
      />
    </div>
  );
};

export default SearchPage;