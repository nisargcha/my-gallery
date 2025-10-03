import React from 'react';
import MediaItem from './MediaItem';

const Gallery = ({ items, isLoading, error, onDelete, onImageClick }) => {
    if (isLoading) {
        return <p className="text-center text-gray-500">Loading media...</p>;
    }
    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }
    if (items.length === 0) {
        return <p className="text-center text-gray-500">No photos or videos yet.</p>;
    }

    return (
        <div className="grid grid-cols-gallery gap-5">
            {items.map((item, index) => (
                <MediaItem 
                    key={item.filename} 
                    item={item} 
                    onDelete={onDelete}
                    onClick={() => onImageClick(index)}
                />
            ))}
        </div>
    );
};

export default Gallery;