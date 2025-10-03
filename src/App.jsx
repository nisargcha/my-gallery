import React from 'react';
import { useAuth } from './context/AuthContext';
import LoginPage from './components/auth/LoginPage';
import MainContent from './components/layout/MainContent';

function App() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <div className="flex w-full h-screen">
      <MainContent />
    </div>
  );
}

export default App;