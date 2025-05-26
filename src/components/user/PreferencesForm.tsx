import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNews } from '../../context/NewsContext';

const PreferencesForm: React.FC = () => {
  const { user, updatePreferences, loading } = useAuth();
  const { categories } = useNews();
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  // Initialize selected preferences from user data
  useEffect(() => {
    if (user && user.preferences) {
      setSelectedPreferences(user.preferences);
    }
  }, [user]);

  // Filter out 'All' from categories
  const topicCategories = categories.filter(category => category !== 'All');

  const handleTogglePreference = (category: string) => {
    setSelectedPreferences(prev => {
      if (prev.includes(category)) {
        return prev.filter(item => item !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!user) {
      setFormError('You must be logged in to update preferences');
      return;
    }

    try {
      await updatePreferences(selectedPreferences);
      navigate('/');
    } catch (error) {
      setFormError((error as Error).message || 'Failed to update preferences');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your News Preferences</h2>
      
      <p className="mb-6 text-gray-600">
        Select the categories you're interested in to personalize your news feed.
      </p>
      
      {formError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md" role="alert">
          {formError}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {topicCategories.map(category => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  className="h-5 w-5 text-blue-800 rounded border-gray-300 focus:ring-blue-500"
                  checked={selectedPreferences.includes(category)}
                  onChange={() => handleTogglePreference(category)}
                />
                <label
                  htmlFor={`category-${category}`}
                  className="ml-2 text-gray-700 cursor-pointer"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            className="mr-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            onClick={() => navigate('/')}
          >
            Skip
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreferencesForm;