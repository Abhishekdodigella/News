import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Search, Home, Bookmark, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenus();
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenus}>
              <span className="text-2xl font-bold text-blue-800">NewsHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                location.pathname === '/' 
                  ? 'text-blue-800 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-800 hover:bg-blue-50'
              }`}
              onClick={closeMenus}
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                location.pathname === '/search' 
                  ? 'text-blue-800 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-800 hover:bg-blue-50'
              }`}
              onClick={closeMenus}
            >
              Search
            </Link>
            {isAuthenticated && (
              <Link 
                to="/saved" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === '/saved' 
                    ? 'text-blue-800 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-800 hover:bg-blue-50'
                }`}
                onClick={closeMenus}
              >
                Saved Articles
              </Link>
            )}

            <div className="relative ml-3">
              {isAuthenticated ? (
                <div>
                  <button
                    type="button"
                    className="flex items-center max-w-xs rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={toggleProfileMenu}
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-800" />
                    </div>
                    <span className="ml-2 text-gray-700">{user?.name}</span>
                  </button>
                  
                  {isProfileMenuOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={closeMenus}
                      >
                        Your Profile
                      </Link>
                      <Link
                        to="/preferences"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={closeMenus}
                      >
                        Preferences
                      </Link>
                      <button
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={handleLogout}
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium"
                    onClick={closeMenus}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-800 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    onClick={closeMenus}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-800 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/' 
                  ? 'text-blue-800 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-800 hover:bg-blue-50'
              }`}
              onClick={closeMenus}
            >
              <div className="flex items-center">
                <Home className="mr-2 h-5 w-5" />
                Home
              </div>
            </Link>
            <Link
              to="/search"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/search' 
                  ? 'text-blue-800 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-800 hover:bg-blue-50'
              }`}
              onClick={closeMenus}
            >
              <div className="flex items-center">
                <Search className="mr-2 h-5 w-5" />
                Search
              </div>
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/saved"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === '/saved' 
                      ? 'text-blue-800 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-800 hover:bg-blue-50'
                  }`}
                  onClick={closeMenus}
                >
                  <div className="flex items-center">
                    <Bookmark className="mr-2 h-5 w-5" />
                    Saved Articles
                  </div>
                </Link>
                <Link
                  to="/profile"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === '/profile' 
                      ? 'text-blue-800 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-800 hover:bg-blue-50'
                  }`}
                  onClick={closeMenus}
                >
                  <div className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Profile
                  </div>
                </Link>
                <Link
                  to="/preferences"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === '/preferences' 
                      ? 'text-blue-800 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-800 hover:bg-blue-50'
                  }`}
                  onClick={closeMenus}
                >
                  <div className="flex items-center">
                    <Settings className="mr-2 h-5 w-5" />
                    Preferences
                  </div>
                </Link>
                <button
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-blue-50"
                  onClick={handleLogout}
                >
                  Sign out
                </button>
              </>
            )}
            {!isAuthenticated && (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-blue-50"
                  onClick={closeMenus}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 mt-1 rounded-md text-base font-medium bg-blue-800 text-white hover:bg-blue-700"
                  onClick={closeMenus}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;