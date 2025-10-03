import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import UploadForm from '../upload/UploadForm';

const Sidebar = ({ isSidebarOpen, setSidebarOpen, currentFolder, onUploadComplete }) => {
  const { currentUser, signOut } = useAuth();

  return (
    <div
      className={`bg-white w-64 p-6 shadow-lg fixed md:relative h-full z-30 transform transition-transform duration-300 ease-in-out 
                  ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
    >
      <div className="flex flex-col h-full">
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

        <UploadForm
          currentFolder={currentFolder}
          onUploadComplete={onUploadComplete}
        />

        <div className="mt-auto">
          <Button onClick={signOut} className="w-full bg-red-500 hover:bg-red-600">
            Sign Out
          </Button>
        </div>
      </div>
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