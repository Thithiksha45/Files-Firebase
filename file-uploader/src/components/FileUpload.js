// src/components/FileUpload.js
import React, { useState } from 'react';
import { storage, ref, uploadBytes, getDownloadURL } from '../firebase/firebase';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileURL, setFileURL] = useState('');
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('No file selected');
      return;
    }

    setIsUploading(true);
    const fileRef = ref(storage, `files/${file.name}`);
    try {
      const uploadTask = await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      setFileURL(url);
      setUploadProgress(100); // Assuming upload is complete
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-form">
      <input type="file" onChange={handleChange} />
      <div className="upload-button-container">
        <button type="button" onClick={handleUpload} disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      <div className="progress">
        {uploadProgress > 0 && <p>Progress: {uploadProgress}%</p>}
      </div>
      {error && <p className="error">{error}</p>}
      {fileURL && (
        <div className="file-url">
          <p>File URL:</p>
          <a href={fileURL} target="_blank" rel="noopener noreferrer">{fileURL}</a>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
