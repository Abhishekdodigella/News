import { User, Article } from '../types';
import { generateMockArticles } from '../utils/mockData';

// LocalStorage keys
const USERS_KEY = 'newsApp_users';
const CURRENT_USER_KEY = 'newsApp_currentUser';
const ARTICLES_KEY = 'newsApp_articles';

// User-related functions
export const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users: User[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const saveCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

export const createUser = (name: string, email: string, password: string): User => {
  const users = getUsers();
  
  // Check if user with email already exists
  if (users.some(user => user.email === email)) {
    throw new Error('User with this email already exists');
  }
  
  const newUser: User = {
    id: `user-${Date.now()}`,
    name,
    email,
    password, // In a real app, this would be hashed
    preferences: [],
    savedArticles: [],
  };
  
  saveUsers([...users, newUser]);
  return newUser;
};

export const loginUser = (email: string, password: string): User => {
  const users = getUsers();
  const user = users.find(user => user.email === email && user.password === password);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  saveCurrentUser(user);
  return user;
};

export const logoutUser = (): void => {
  saveCurrentUser(null);
};

export const updateUserPreferences = (userId: string, preferences: string[]): User => {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  const updatedUser = {
    ...users[userIndex],
    preferences,
  };
  
  users[userIndex] = updatedUser;
  saveUsers(users);
  
  // If this is the current user, update the current user as well
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    saveCurrentUser(updatedUser);
  }
  
  return updatedUser;
};

export const saveArticle = (userId: string, articleId: string): User => {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  // Add articleId to savedArticles if not already there
  if (!users[userIndex].savedArticles.includes(articleId)) {
    const updatedUser = {
      ...users[userIndex],
      savedArticles: [...users[userIndex].savedArticles, articleId],
    };
    
    users[userIndex] = updatedUser;
    saveUsers(users);
    
    // If this is the current user, update the current user as well
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      saveCurrentUser(updatedUser);
    }
    
    return updatedUser;
  }
  
  return users[userIndex];
};

export const removeArticle = (userId: string, articleId: string): User => {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  const updatedUser = {
    ...users[userIndex],
    savedArticles: users[userIndex].savedArticles.filter(id => id !== articleId),
  };
  
  users[userIndex] = updatedUser;
  saveUsers(users);
  
  // If this is the current user, update the current user as well
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    saveCurrentUser(updatedUser);
  }
  
  return updatedUser;
};

// Article-related functions
export const getArticles = (): Article[] => {
  let articles = localStorage.getItem(ARTICLES_KEY);
  
  if (!articles) {
    // Generate mock articles if none exist
    const mockArticles = generateMockArticles();
    saveArticles(mockArticles);
    return mockArticles;
  }
  
  return JSON.parse(articles);
};

export const saveArticles = (articles: Article[]): void => {
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
};

export const getArticleById = (articleId: string): Article | undefined => {
  const articles = getArticles();
  return articles.find(article => article.id === articleId);
};

export const getSavedArticles = (savedArticleIds: string[]): Article[] => {
  const articles = getArticles();
  return articles.filter(article => savedArticleIds.includes(article.id));
};