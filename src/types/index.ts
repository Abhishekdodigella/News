export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  preferences: string[];
  savedArticles: string[];
}

export interface Article {
  id: string;
  title: string;
  source: string;
  author: string;
  category: string;
  publishedAt: string;
  summary: string;
  content: string;
  imageUrl: string;
  url: string;
}