import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const LoginPage = () => {
  const { signInWithGoogle, signInWithEmailAndPassword, signUpWithEmailAndPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleAuthAction = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isSigningUp) {
        await signUpWithEmailAndPassword(email, password);
      } else {
        await signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Failed to sign in with Google:", error);
      setError("Failed to sign in with Google. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 p-8 sm:p-10 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Photo Album</h1>
          <p className="text-gray-600">
            {isSigningUp ? 'Create an account to continue.' : 'Please sign in to continue.'}
          </p>
        </div>
        
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="space-y-6" onSubmit={handleAuthAction}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            {isSigningUp ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <Button onClick={handleGoogleSignIn} className="w-full bg-red-500 hover:bg-red-600">
          Sign in with Google
        </Button>

        <p className="text-sm text-center text-gray-600">
          {isSigningUp ? 'Already have an account?' : "Don't have an account?"}
          <button
            onClick={() => setIsSigningUp(!isSigningUp)}
            className="ml-1 font-semibold text-blue-600 hover:underline"
          >
            {isSigningUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;