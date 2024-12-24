import { useState } from 'react';
import AssetCard from './AssetCard';
import '../styles/assets.css';
import lockIcon from '../assets/lock.svg';
import folderIcon from '../assets/folder.svg';

function AssetList({ assets, onDeleteAsset, onUpdateAsset }) {
  const [filterType, setFilterType] = useState('all');

  const filteredAssets = filterType === 'all' 
    ? assets 
    : assets.filter(asset => asset.type === filterType);

  if (!assets || assets.length === 0) {
    return (
      <div className="assets-empty">
        <img src={folderIcon} alt="" className="empty-icon" />
        <h2>No Digital Assets Yet</h2>
        <p>Start securing your digital legacy by adding your first asset.</p>
      </div>
    );
  }

  return (
    <div className="assets-container">
      <div className="assets-header">
        <h2 className="assets-title">
          <img src={lockIcon} alt="" className="section-icon" />
          Your Digital Assets
          <span className="asset-count">{assets.length}</span>
        </h2>
        
        <div className="assets-filter">
          <label htmlFor="type-filter">Filter by:</label>
          <select 
            id="type-filter"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Assets</option>
            <option value="social">Social Media</option>
            <option value="email">Email Accounts</option>
            <option value="financial">Financial Accounts</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      
      <div className="asset-grid">
        {filteredAssets.map(asset => (
          <AssetCard
            key={asset.id}
            asset={asset}
            onDelete={onDeleteAsset}
            onUpdate={onUpdateAsset}
          />
        ))}
      </div>
    </div>
  );
}

export default AssetList;