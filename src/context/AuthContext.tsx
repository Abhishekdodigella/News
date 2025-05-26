import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { getCurrentUser, loginUser, logoutUser, createUser, updateUserPreferences, saveArticle, removeArticle } from '../services/localStorage';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  updatePreferences: (preferences: string[]) => Promise<void>;
  saveArticleToFavorites: (articleId: string) => Promise<void>;
  removeArticleFromFavorites: (articleId: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const loggedInUser = loginUser(email, password);
      setUser(loggedInUser);
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    logoutUser();
    setUser(null);
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const newUser = createUser(name, email, password);
      setUser(newUser);
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (preferences: string[]): Promise<void> => {
    if (!user) {
      setError('User not authenticated');
      return;
    }
    
    try {
      const updatedUser = updateUserPreferences(user.id, preferences);
      setUser(updatedUser);
    } catch (err) {
      setError((err as Error).message);
      throw err;
    }
  };

  const saveArticleToFavorites = async (articleId: string): Promise<void> => {
    if (!user) {
      setError('User not authenticated');
      return;
    }
    
    try {
      const updatedUser = saveArticle(user.id, articleId);
      setUser(updatedUser);
    } catch (err) {
      setError((err as Error).message);
      throw err;
    }
  };

  const removeArticleFromFavorites = async (articleId: string): Promise<void> => {
    if (!user) {
      setError('User not authenticated');
      return;
    }
    
    try {
      const updatedUser = removeArticle(user.id, articleId);
      setUser(updatedUser);
    } catch (err) {
      setError((err as Error).message);
      throw err;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    updatePreferences,
    saveArticleToFavorites,
    removeArticleFromFavorites,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};