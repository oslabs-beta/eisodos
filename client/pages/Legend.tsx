import React from 'react';

const Legend: React.FC = () => {
  return (
    // Legend container
    <div className="absolute right-5 top-1 bg-black p-5 text-white">
      <h4>Legend</h4>

      <div className="mb-3 flex items-center">
        <svg width="20" height="20" className="mr-3">
          <rect width="20" height="20" style={{ fill: '#2563eb' }} />
        </svg>
        <div>Namespace</div>
      </div>

      <div className="mb-3 flex items-center">
        <svg width="20" height="20" viewBox="0 0 20 20" className="mr-3">
          <polygon points="10,0 20,20 0,20" style={{ fill: '#22d3ee' }} />
        </svg>
        <div>Node</div>
      </div>

      <div className="mb-3 flex items-center">
        <svg width="20" height="20" className="mr-3">
          <circle cx="10" cy="10" r="10" style={{ fill: '#4ade80' }} />
        </svg>
        <div>Pod</div>
      </div>
    </div>
  );
};

export default Legend;
