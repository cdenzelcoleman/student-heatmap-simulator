import React from 'react';

function Building({ id, count, isActive, position }) {
  // Calculate size based on count (min 40px, max 120px)
  const size = Math.max(40, Math.min(120, 40 + count * 4));

  // Color: red if most active, blue otherwise
  const backgroundColor = isActive ? '#ef4444' : '#3b82f6';

  const style = {
    position: 'absolute',
    left: position.x,
    top: position.y,
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor,
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    transition: 'all 0.5s ease',
    boxShadow: isActive ? '0 0 20px rgba(239, 68, 68, 0.6)' : '0 4px 6px rgba(0,0,0,0.1)',
    transform: `translate(-50%, -50%)`,
  };

  return (
    <div style={style}>
      <div style={{ fontSize: '24px' }}>{id}</div>
      <div style={{ fontSize: '16px', marginTop: '4px' }}>{count}</div>
      {isActive && <div style={{ fontSize: '10px', marginTop: '2px' }}>MOST ACTIVE</div>}
    </div>
  );
}

export default Building;
