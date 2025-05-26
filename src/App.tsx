import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NewsProvider } from './context/NewsContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import SearchPage from './pages/SearchPage';
import SavedArticlesPage from './pages/SavedArticlesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import PreferencesPage from './pages/PreferencesPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NewsProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-gray-50">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/article/:id" element={<ArticlePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/saved" element={<SavedArticlesPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/preferences" element={<PreferencesPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </NewsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;