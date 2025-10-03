import React from 'react';
import { useAuth } from '../../context/AuthContext';
import * as api from '../../api/galleryService';

const MediaItem = ({ item, onDelete, onClick }) => {
    const { idToken } = useAuth();
    const isVideo = item.filename.match(/\.(mp4|webm|mov)$/i);

    const handleDelete = async (e) => {
        e.stopPropagation(); // Prevent opening lightbox
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await api.deletePhoto(item.filename, idToken);
                onDelete(item.filename); // Notify parent component
            } catch (error) {
                console.error("Error deleting photo:", error);
                alert(`Failed to delete: ${error.message}`);
            }
        }
    };

    return (
        <div className="relative group rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform duration-200 ease-in-out hover:-translate-y-1" onClick={onClick}>
            {isVideo ? (
                <video src={item.url} className="w-full h-52 object-cover" muted />
            ) : (
                <img src={item.url} alt={item.filename} className="w-full h-52 object-cover" loading="lazy" />
            )}
            <button onClick={handleDelete} className="absolute top-2 right-2 z-10 bg-red-500/80 text-white w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                &times;
            </button>
        </div>
    );
};

export default MediaItem;