import React from 'react';
import '../styles/Loading.css';

function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

export default Loading;