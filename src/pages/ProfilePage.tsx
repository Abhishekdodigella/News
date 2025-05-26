import React from 'react';
import { Navigate } from 'react-router-dom';
import ProfileInfo from '../components/user/ProfileInfo';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect if not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Profile</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>
      
      <ProfileInfo />
    </div>
  );
};

export default ProfilePage;