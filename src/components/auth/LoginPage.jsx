import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const LoginPage = () => {
    const { signInWithGoogle } = useAuth();

    const handleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error("Failed to sign in:", error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center p-10 bg-white rounded-lg shadow-2xl max-w-md w-full">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Photo Album</h1>
                <p className="text-gray-600 mb-8">Please sign in to continue.</p>
                <Button onClick={handleSignIn} className="bg-red-500 hover:bg-red-600">
                    Sign in with Google
                </Button>
            </div>
        </div>
    );
};

export default LoginPage;