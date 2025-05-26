import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">NewsHub</h3>
            <p className="text-gray-600">
              Your personalized news aggregator, bringing you the latest stories from around the world.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-800 transition-colors duration-200">Technology</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-800 transition-colors duration-200">Business</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-800 transition-colors duration-200">Health</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-800 transition-colors duration-200">Science</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-800 transition-colors duration-200">Politics</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-800 transition-colors duration-200">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-800 transition-colors duration-200">Contact</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-800 transition-colors duration-200">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-800 transition-colors duration-200">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-center">&copy; {new Date().getFullYear()} NewsHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;