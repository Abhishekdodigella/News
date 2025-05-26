import { Article } from '../types';

// Generate a set of mock articles for development
export const generateMockArticles = (): Article[] => {
  const categories = ['Technology', 'Business', 'Health', 'Science', 'Politics', 'Sports', 'Entertainment'];
  const sources = ['Tech Daily', 'Business Insider', 'Health Today', 'Science Weekly', 'Politics Hub', 'Sports Center', 'Entertainment Now'];
  
  const articles: Article[] = [];
  
  // Generate 30 mock articles
  for (let i = 1; i <= 30; i++) {
    const categoryIndex = Math.floor(Math.random() * categories.length);
    const category = categories[categoryIndex];
    const source = sources[categoryIndex];
    
    // Generate a random date within the last 7 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 7));
    
    articles.push({
      id: `article-${i}`,
      title: `${category} Headline ${i}: The Latest Developments You Need to Know`,
      source,
      author: `Author ${i}`,
      category,
      publishedAt: date.toISOString(),
      summary: `This is a brief summary of the article about ${category.toLowerCase()}. It contains the main points that readers would find interesting.`,
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, quam nisi tincidunt arcu, eget aliquam nisl nunc vel nisi. Sed vitae nisl eget nisi tincidunt aliquam. Sed vitae nisl eget nisi tincidunt aliquam. Sed vitae nisl eget nisi tincidunt aliquam.`,
      imageUrl: `https://source.unsplash.com/random/800x600?${category.toLowerCase()}`,
      url: '#',
    });
  }
  
  return articles;
};

// Get trending articles (most recent ones)
export const getTrendingArticles = (articles: Article[]): Article[] => {
  return [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5);
};

// Filter articles by category
export const filterArticlesByCategory = (articles: Article[], category: string): Article[] => {
  if (!category || category === 'All') return articles;
  return articles.filter(article => article.category === category);
};

// Search articles by keyword
export const searchArticles = (articles: Article[], keyword: string): Article[] => {
  if (!keyword) return articles;
  const lowerKeyword = keyword.toLowerCase();
  return articles.filter(
    article => 
      article.title.toLowerCase().includes(lowerKeyword) || 
      article.summary.toLowerCase().includes(lowerKeyword)
  );
};

// Filter articles by user preferences
export const filterArticlesByPreferences = (articles: Article[], preferences: string[]): Article[] => {
  if (!preferences.length) return articles;
  return articles.filter(article => preferences.includes(article.category));
};