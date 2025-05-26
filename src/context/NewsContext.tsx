import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Article } from '../types';
import { getArticles, getSavedArticles } from '../services/localStorage';
import { filterArticlesByCategory, searchArticles, filterArticlesByPreferences, getTrendingArticles } from '../utils/mockData';
import { useAuth } from './AuthContext';

interface NewsContextType {
  articles: Article[];
  filteredArticles: Article[];
  savedArticles: Article[];
  trendingArticles: Article[];
  loading: boolean;
  error: string | null;
  selectedCategory: string;
  searchTerm: string;
  setSelectedCategory: (category: string) => void;
  setSearchTerm: (term: string) => void;
  categories: string[];
  refreshArticles: () => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const useNews = (): NewsContextType => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};

interface NewsProviderProps {
  children: ReactNode;
}

export const NewsProvider: React.FC<NewsProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  // Load articles on initial render
  useEffect(() => {
    refreshArticles();
  }, []);

  // Update filtered articles when search, category, or user preferences change
  useEffect(() => {
    if (articles.length > 0) {
      let filtered = [...articles];
      
      // Filter by category
      if (selectedCategory !== 'All') {
        filtered = filterArticlesByCategory(filtered, selectedCategory);
      }
      
      // Filter by search term
      if (searchTerm) {
        filtered = searchArticles(filtered, searchTerm);
      }
      
      // Apply user preferences if available and no specific category is selected
      if (user && user.preferences.length > 0 && selectedCategory === 'All' && !searchTerm) {
        filtered = filterArticlesByPreferences(filtered, user.preferences);
      }
      
      setFilteredArticles(filtered);
    }
  }, [articles, selectedCategory, searchTerm, user]);

  // Update saved articles when user changes
  useEffect(() => {
    if (user && articles.length > 0) {
      const userSavedArticles = getSavedArticles(user.savedArticles);
      setSavedArticles(userSavedArticles);
    } else {
      setSavedArticles([]);
    }
  }, [user, articles]);

  // Extract unique categories from articles
  useEffect(() => {
    if (articles.length > 0) {
      const uniqueCategories = ['All', ...new Set(articles.map(article => article.category))];
      setCategories(uniqueCategories);
    }
  }, [articles]);

  const refreshArticles = () => {
    setLoading(true);
    try {
      const allArticles = getArticles();
      setArticles(allArticles);
      setFilteredArticles(allArticles);
      setTrendingArticles(getTrendingArticles(allArticles));
      
      // Extract categories
      const uniqueCategories = ['All', ...new Set(allArticles.map(article => article.category))];
      setCategories(uniqueCategories);
      
      // Update saved articles if user is logged in
      if (user) {
        const userSavedArticles = getSavedArticles(user.savedArticles);
        setSavedArticles(userSavedArticles);
      }
    } catch (err) {
      setError('Failed to load articles');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    articles,
    filteredArticles,
    savedArticles,
    trendingArticles,
    loading,
    error,
    selectedCategory,
    searchTerm,
    setSelectedCategory,
    setSearchTerm,
    categories,
    refreshArticles,
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};