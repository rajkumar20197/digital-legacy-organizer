import { useState } from 'react';
import '../styles/assets.css';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';
import eyeIcon from '../assets/eye.svg';
import eyeOffIcon from '../assets/eye-off.svg';

function AssetCard({ asset, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editedAsset, setEditedAsset] = useState(asset);

  const handleSave = () => {
    onUpdate(asset.id, editedAsset);
    setIsEditing(false);
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'social': return '🌐';
      case 'email': return '📧';
      case 'financial': return '💰';
      default: return '📁';
    }
  };

  return (
    <div className="asset-card">
      <div className="asset-header">
        <span className="asset-type-icon">{getTypeIcon(asset.type)}</span>
        {isEditing ? (
          <input
            type="text"
            value={editedAsset.title}
            onChange={(e) => setEditedAsset({...editedAsset, title: e.target.value})}
            className="edit-title"
          />
        ) : (
          <h3>{asset.title}</h3>
        )}
      </div>

      <div className="asset-body">
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={editedAsset.username}
              onChange={(e) => setEditedAsset({...editedAsset, username: e.target.value})}
              placeholder="Username/Email"
            />
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                value={editedAsset.password}
                onChange={(e) => setEditedAsset({...editedAsset, password: e.target.value})}
                placeholder="Password"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password"
              >
                <img src={showPassword ? eyeOffIcon : eyeIcon} alt="Toggle password" />
              </button>
            </div>
            <textarea
              value={editedAsset.notes}
              onChange={(e) => setEditedAsset({...editedAsset, notes: e.target.value})}
              placeholder="Notes"
            />
            <div className="edit-actions">
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <div className="asset-info">
              <span className="label">Username:</span>
              <span className="value">{asset.username}</span>
            </div>
            <div className="asset-info password-info">
              <span className="label">Password:</span>
              <div className="password-display">
                <span className="value">
                  {showPassword ? asset.password : '••••••••'}
                </span>
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-password"
                >
                  <img src={showPassword ? eyeOffIcon : eyeIcon} alt="Toggle password" />
                </button>
              </div>
            </div>
            {asset.notes && (
              <div className="asset-info">
                <span className="label">Notes:</span>
                <span className="value">{asset.notes}</span>
              </div>
            )}
          </>
        )}
      </div>

      <div className="asset-actions">
        {!isEditing && (
          <>
            <button onClick={() => setIsEditing(true)}>
              <img src={editIcon} alt="Edit" /> Edit
            </button>
            <button onClick={() => onDelete(asset.id)}>
              <img src={deleteIcon} alt="Delete" /> Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default AssetCard;