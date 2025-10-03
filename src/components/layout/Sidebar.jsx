import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import * as api from '../../api/galleryService';

const Sidebar = ({ folders = [], onSelectFolder, activeFolder, onFolderCreated }) => {
    const { signOut, idToken } = useAuth();
    const [newFolderName, setNewFolderName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const handleCreateFolder = async (e) => {
        e.preventDefault();
        if (!newFolderName.trim() || !idToken) return;

        setIsCreating(true);
        try {
            await api.createFolder(newFolderName, idToken);
            setNewFolderName('');
            onFolderCreated(); // Notify parent to refetch folders
        } catch (error) {
            console.error("Error creating folder:", error);
            alert(`Failed to create folder: ${error.message}`);
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <aside className="flex-shrink-0 w-72 bg-white border-r border-gray-200 p-5 flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Albums</h2>
                <button 
                    onClick={signOut} 
                    className="text-sm font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md transition-colors"
                >
                    Sign Out
                </button>
            </div>

            <ul className="flex-grow overflow-y-auto pr-2">
                {folders.map(folder => (
                    <li 
                        key={folder}
                        onClick={() => onSelectFolder(`${folder}/`)}
                        className={`p-3 rounded-md cursor-pointer font-semibold transition mb-2 ${
                            activeFolder === `${folder}/`
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        {folder}
                    </li>
                ))}
            </ul>

            <hr className="my-4 border-gray-200"/>

            <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Create New Album</h3>
                <form onSubmit={handleCreateFolder}>
                    <input
                        type="text"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        placeholder="Album Name"
                        className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        disabled={isCreating}
                    />
                    <button 
                        type="submit" 
                        disabled={isCreating} 
                        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isCreating ? 'Creating...' : 'Create'}
                    </button>
                </form>
            </div>
        </aside>
    );
};

export default Sidebar;