import React from 'react';

const Legend: React.FC = () => {
  return (
    // Legend container
    <div>
      <div className="absolute end-0 top-0 rounded-l-lg rounded-br-lg bg-black-2 px-6 text-white">
        <h4 className="mb-2 mt-3 text-center text-lg font-bold">Legend</h4>
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
    </div>
  );
};

export default Legend;
