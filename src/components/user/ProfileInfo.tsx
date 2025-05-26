import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

const ProfileInfo: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="text-center py-8">
        <p>Please log in to view your profile.</p>
        <Link 
          to="/login"
          className="mt-4 inline-block px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Profile</h2>
        <Link
          to="/preferences"
          className="flex items-center text-blue-800 hover:text-blue-700"
        >
          <Settings className="h-5 w-5 mr-1" />
          <span>Edit Preferences</span>
        </Link>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 text-4xl font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Preferences</h3>
        {user.preferences && user.preferences.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {user.preferences.map(pref => (
              <span 
                key={pref} 
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {pref}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No preferences set. <Link to="/preferences" className="text-blue-800 hover:underline">Add some?</Link></p>
        )}
      </div>
      
      <div className="border-t border-gray-200 pt-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Account Summary</h3>
        <ul className="space-y-2 text-gray-700">
          <li>
            <span className="font-medium">Saved Articles:</span> {user.savedArticles.length}
          </li>
          <li>
            <span className="font-medium">Member Since:</span> {new Date().toLocaleDateString()}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileInfo;