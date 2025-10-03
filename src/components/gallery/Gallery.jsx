import React, { useState } from 'react';
import MediaItem from './MediaItem';
import Lightbox from '../ui/Lightbox';

const Gallery = ({ media, fetchMedia }) => {
    const [lightboxImage, setLightboxImage] = useState(null);

    const handleFolderClick = (folderName) => {
        fetchMedia(folderName);
    };

    const handleFileClick = (url) => {
        setLightboxImage(url);
    };

    const closeLightbox = () => {
        setLightboxImage(null);
    };

    const folders = media.filter(item => item.type === 'folder');
    const files = media.filter(item => item.type !== 'folder');

    return (
        <div>
            {/* You can add breadcrumbs for navigation here */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {folders.map(item => (
                    <div key={item.name} onClick={() => handleFolderClick(item.name)} className="cursor-pointer p-2 text-center">
                        {/* A simple folder icon */}
                        <svg className="w-16 h-16 mx-auto text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                        </svg>
                        <p className="mt-2 text-sm font-semibold truncate">{item.name.slice(0, -1)}</p>
                    </div>
                ))}
                {files.map(item => (
                    <MediaItem key={item.name} item={item} onFileClick={handleFileClick} />
                ))}
            </div>
            {lightboxImage && <Lightbox imageUrl={lightboxImage} onClose={closeLightbox} />}
        </div>
    );
};

export default Gallery;