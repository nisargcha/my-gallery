import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import UploadForm from '../upload/UploadForm';

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
  const { currentUser, signOut } = useAuth();

  return (
    // This container handles the sidebar's position and appearance.
    // It's fixed on mobile and part of the layout on desktop.
    <div 
      className={`bg-white w-64 p-6 shadow-lg fixed md:relative h-full z-30 transform transition-transform duration-300 ease-in-out 
                  ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
    >
      <div className="flex flex-col h-full">
        {/* User profile section */}
        <div className="flex items-center mb-8">
          <img 
            src={currentUser.photoURL || 'https://via.placeholder.com/40'} 
            alt="User" 
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-semibold text-gray-800">{currentUser.displayName || 'User'}</p>
            <p className="text-sm text-gray-500">{currentUser.email}</p>
          </div>
        </div>
        
        {/* File upload form */}
        <UploadForm />

        {/* Sign out button at the bottom */}
        <div className="mt-auto">
          <Button onClick={signOut} className="w-full bg-red-500 hover:bg-red-600">
            Sign Out
          </Button>
        </div>
      </div>

      {/* This dark overlay appears behind the sidebar on mobile to focus attention */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black opacity-50 z-20" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;