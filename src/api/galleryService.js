const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:8080';

const apiFetch = async (endpoint, idToken, options = {}) => {
  if (!idToken) {
    throw new Error("Authentication token is missing.");
  }

  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${idToken}`,
  };

  if (options.body && typeof options.body === 'object') {
     headers['Content-Type'] = 'application/json';
     options.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${BACKEND_URL}${endpoint}`, { ...options, headers });

  if (response.status === 401 || response.status === 403) {
    throw new Error("Unauthorized");
  }
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'API error.' }));
    throw new Error(errorData.message);
  }

  // Handle responses that might not have a JSON body (like DELETE)
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  }
  return response; // Or just return true, or the response object itself
};

export const getFolders = (idToken) => apiFetch('/get-folders', idToken);
export const createFolder = (folderName, idToken) => apiFetch('/create-folder', idToken, { method: 'POST', body: { folder: `${folderName}/` } });
export const getPhotos = (folder, idToken) => apiFetch(`/get-photos?folder=${encodeURIComponent(folder)}`, idToken);
export const deletePhoto = (filename, idToken) => apiFetch('/delete-photo', idToken, { method: 'DELETE', body: { filename } });

export const getUploadUrl = (filename, folder, contentType, idToken) => {
    return apiFetch('/generate-upload-url', idToken, {
        method: 'POST',
        body: { filename, folder, contentType }
    });
};

export const uploadFileToSignedUrl = (url, file) => {
    return fetch(url, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type }
    });
};