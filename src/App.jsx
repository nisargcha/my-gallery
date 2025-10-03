import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import LoginPage from './components/auth/LoginPage';
import Sidebar from './components/layout/Sidebar';
import MainContent from './components/layout/MainContent';

const App = () => {
  const { currentUser } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
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
        <MainContent />
      </div>
    </div>
  );
};

export default App;