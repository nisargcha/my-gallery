import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import * as api from './api/galleryService';
import LoginPage from './components/auth/LoginPage';
import Sidebar from './components/layout/Sidebar';
import MainContent from './components/layout/MainContent';

const App = () => {
  const { currentUser, idToken } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [media, setMedia] = useState([]);
  const [currentFolder, setCurrentFolder] = useState('');

  const fetchMedia = async (folder = '') => {
    if (!idToken) return;
    try {
      const items = await api.getMedia(folder, idToken);
      setMedia(items);
      setCurrentFolder(folder);
    } catch (error) {
      console.error("Failed to fetch media:", error);
    }
  };

  useEffect(() => {
    if (idToken) {
      fetchMedia();
    }
  }, [idToken]);

  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentFolder={currentFolder}
        onUploadComplete={() => fetchMedia(currentFolder)}
      />
      <div className="flex-1 flex flex-col relative">
        <button
          className="md:hidden p-4 absolute top-0 right-0 z-20"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          {/* Hamburger Icon */}
          <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <MainContent
          media={media}
          fetchMedia={fetchMedia}
        />
      </div>
    </div>
  );
};

export default App;