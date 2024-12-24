import { useState } from 'react';
import '../styles/forms.css';

function AssetForm({ onAddAsset }) {
  const [assetData, setAssetData] = useState({
    title: '',
    type: '',
    username: '',
    password: '',
    notes: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!assetData.title || !assetData.type) {
      setError('Title and type are required');
      return;
    }

    onAddAsset(assetData)
      .then(() => {
        setAssetData({
          title: '',
          type: '',
          username: '',
          password: '',
          notes: ''
        });
        setError('');
      })
      .catch(err => {
        setError(err.error || 'Failed to add asset');
      });
  };

  return (
    <div className="add-asset-section">
      <h2>Add Digital Asset</h2>
      
      {error && (
        <div className="error" role="alert">
          {error}
        </div>
      )}

      <form className="asset-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="title">Asset Title:</label>
          <input
            id="title"
            name="title"
            value={assetData.title}
            onChange={(e) => setAssetData({...assetData, title: e.target.value})}
          />
        </div>

        <div className="form-field">
          <label htmlFor="type">Asset Type:</label>
          <select
            id="type"
            name="type"
            value={assetData.type}
            onChange={(e) => setAssetData({...assetData, type: e.target.value})}
          >
            <option value="">Select type</option>
            <option value="social">Social Media</option>
            <option value="email">Email</option>
            <option value="financial">Financial</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Add more form fields as needed */}
        
        <button type="submit" className="button">
          Add Asset
        </button>
      </form>
    </div>
  );
}

export default AssetForm;