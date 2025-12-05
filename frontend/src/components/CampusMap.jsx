import React from 'react';
import Building from './Building';

// Hardcoded campus-like positions (in pixels, relative to 800x600 container)
const BUILDING_POSITIONS = {
  A: { x: 150, y: 150 },   // Top-left
  B: { x: 650, y: 150 },   // Top-right
  C: { x: 400, y: 300 },   // Center
  D: { x: 150, y: 450 },   // Bottom-left
  E: { x: 650, y: 450 },   // Bottom-right
};

function CampusMap({ currentCounts, mostActive }) {
  const buildings = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div style={{
      position: 'relative',
      width: '800px',
      height: '600px',
      backgroundColor: '#f0f9ff',
      border: '2px solid #0284c7',
      borderRadius: '12px',
      margin: '0 auto',
    }}>
      <h2 style={{
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#0284c7',
        margin: 0,
      }}>
        Campus Map
      </h2>

      {buildings.map(buildingId => (
        <Building
          key={buildingId}
          id={buildingId}
          count={currentCounts[buildingId] || 0}
          isActive={mostActive?.buildingId === buildingId}
          position={BUILDING_POSITIONS[buildingId]}
        />
      ))}
    </div>
  );
}

export default CampusMap;
