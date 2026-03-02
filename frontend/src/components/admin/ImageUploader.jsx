import { useState } from 'react';
import Button from '../common/Button';

function ImageUploader({ onUpload, imageUrl, loading }) {
  const [file, setFile] = useState(null);
  const [localError, setLocalError] = useState('');

  const handleSelect = (event) => {
    setLocalError('');
    const selected = event.target.files?.[0];
    if (!selected) return;
    if (!selected.type.startsWith('image/')) {
      setLocalError('Please select an image file.');
      return;
    }
    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) {
      setLocalError('Select an image first.');
      return;
    }
    await onUpload(file);
  };

  return (
    <div className="admin-section">
      <h3>1. Upload Product Image</h3>
      <div className="admin-row">
        <input type="file" accept="image/*" onChange={handleSelect} />
        <div className="admin-inline-btn">
          <Button type="button" onClick={handleUpload} loading={loading}>
            Upload Image
          </Button>
        </div>
      </div>
      {localError && <p className="message error">{localError}</p>}
      {imageUrl && (
        <div className="image-preview">
          <img src={imageUrl} alt="Uploaded product" />
          <p>Image uploaded successfully.</p>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
