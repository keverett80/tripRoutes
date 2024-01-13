import React from 'react';


export const Legend = () => (
  <div className="legend">
    <div className="legend-item">
      <span className="color-box" style={{ backgroundColor: 'black' }}></span> Stretcher
    </div>
    <div className="legend-item">
      <span className="color-box" style={{ backgroundColor: 'orange' }}></span> Wheelchair
    </div>
    <div className="legend-item">
      <span className="color-box" style={{ backgroundColor: 'purple' }}></span> Ambulatory
    </div>
    {/* Add more legend items if needed */}
  </div>
);

