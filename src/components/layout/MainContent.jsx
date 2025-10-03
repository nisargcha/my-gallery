import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import * as api from '../../api/galleryService';
import UploadForm from '../upload/UploadForm';
import Gallery from '../gallery/Gallery';
import Lightbox from '../ui/Lightbox';
import Sidebar from './Sidebar'; // Importing Sidebar here

const MainContentContainer = () => {
    const { idToken } = useAuth();
    const [folders, setFolders] = useState([]);
    const [currentFolder, setCurrentFolder] = useState(null);
    const [mediaItems, setMediaItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Lightbox State
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const fetchFolders = useCallback(async () => {
        if (!idToken) return;
        try {
            const folderData = await api.getFolders(idToken);
            setFolders(folderData);
        } catch (err) {
            setError('Failed to load albums.');
            console.error(err);
        }
    }, [idToken]);

    const fetchPhotos = useCallback(async () => {
        if (!currentFolder || !idToken) return;
        setIsLoading(true);
        setError(null);
        try {
            const photosData = await api.getPhotos(currentFolder, idToken);
            setMediaItems(photosData);
        } catch (err) {
            setError('Failed to load media for this album.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [currentFolder, idToken]);

    useEffect(() => {
        fetchFolders();
    }, [fetchFolders]);

    useEffect(() => {
        fetchPhotos();
    }, [fetchPhotos]);

    const handleSelectFolder = (folder) => {
        setCurrentFolder(folder);
        setMediaItems([]); // Clear previous media
    };
    
    const handleMediaDeleted = (filename) => {
        setMediaItems(prev => prev.filter(item => item.filename !== filename));
    };

    const openLightbox = (index) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);
    const showNextMedia = () => setLightboxIndex((prev) => (prev + 1) % mediaItems.length);
    const showPreviousMedia = () => setLightboxIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);

    return (
        <>
            <Sidebar 
                folders={folders} 
                onSelectFolder={handleSelectFolder}
                activeFolder={currentFolder}
                onFolderCreated={fetchFolders}
            />
            <main className="flex-grow p-8 overflow-y-auto">
                {currentFolder ? (
                    <>
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">
                           Album: {currentFolder.slice(0, -1)}
                        </h1>
                        <UploadForm currentFolder={currentFolder} onUploadComplete={fetchPhotos} />
                        <Gallery 
                           items={mediaItems}
                           isLoading={isLoading}
                           error={error}
                           onDelete={handleMediaDeleted}
                           onImageClick={openLightbox}
                        />
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <h1 className="text-3xl text-gray-500">Select an album to get started</h1>
                    </div>
                )}
            </main>
            {lightboxIndex !== null && (
                <Lightbox 
                    mediaItem={mediaItems[lightboxIndex]}
                    onClose={closeLightbox}
                    onNext={showNextMedia}
                    onPrev={showPreviousMedia}
                />
            )}
        </>
    );
};

// Renaming MainContent to MainContentContainer to avoid confusion with the file name
// And changing the component in App.jsx to use this one
export default MainContentContainer;