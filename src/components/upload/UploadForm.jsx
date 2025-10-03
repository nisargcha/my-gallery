import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import * as api from '../../api/galleryService';

const UploadForm = ({ currentFolder, onUploadComplete }) => {
    const { idToken } = useAuth();
    const [files, setFiles] = useState([]);
    const [status, setStatus] = useState('');

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            alert('Please select files to upload.');
            return;
        }

        setStatus(`Uploading ${files.length} file(s)...`);

        try {
            const uploadPromises = files.map(async (file) => {
                const { url } = await api.getUploadUrl(file.name, currentFolder, file.type, idToken);
                await api.uploadFileToSignedUrl(url, file);
            });
            await Promise.all(uploadPromises);
            setStatus('Upload complete!');
            setFiles([]); 
            document.getElementById('fileInput').value = ''; 
            if (onUploadComplete) {
                onUploadComplete(); // This will refresh the gallery
            }
        } catch (error) {
            console.error("Upload failed:", error);
            setStatus(`Upload failed: ${error.message}`);
        } finally {
            setTimeout(() => setStatus(''), 3000);
        }
    };

    // This check prevents the app from crashing if currentFolder is initially undefined.
    const folderName = currentFolder ? currentFolder.slice(0, -1) : 'root';

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg mb-8">
            <h3 className="text-xl font-bold mb-4">
                Upload to "<span className="text-blue-600">{folderName}</span>"
            </h3>
            <div className="flex items-center space-x-4">
                <input
                    id="fileInput"
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="flex-grow p-2 border border-gray-300 rounded-md"
                />
                <button onClick={handleUpload} className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600">
                    Upload
                </button>
            </div>
            {status && <p className="mt-4 text-sm font-medium text-gray-600">{status}</p>}
        </div>
    );
};

export default UploadForm;