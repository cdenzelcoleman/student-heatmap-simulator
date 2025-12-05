import React from 'react';

function ControlPanel({ isRunning, onStart, onStop, onReset }) {
  const buttonStyle = {
    padding: '12px 24px',
    margin: '0 8px',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  };

  const startStyle = {
    ...buttonStyle,
    backgroundColor: isRunning ? '#9ca3af' : '#10b981',
    color: 'white',
    cursor: isRunning ? 'not-allowed' : 'pointer',
  };

  const stopStyle = {
    ...buttonStyle,
    backgroundColor: !isRunning ? '#9ca3af' : '#ef4444',
    color: 'white',
    cursor: !isRunning ? 'not-allowed' : 'pointer',
  };

  const resetStyle = {
    ...buttonStyle,
    backgroundColor: '#f59e0b',
    color: 'white',
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      marginBottom: '20px',
    }}>
      <div style={{ marginRight: '20px', fontSize: '18px', fontWeight: 'bold' }}>
        Status: <span style={{ color: isRunning ? '#10b981' : '#ef4444' }}>
          {isRunning ? 'RUNNING' : 'STOPPED'}
        </span>
      </div>

      <button style={startStyle} onClick={onStart} disabled={isRunning}>
        Start
      </button>

      <button style={stopStyle} onClick={onStop} disabled={!isRunning}>
        Stop
      </button>

      <button style={resetStyle} onClick={onReset}>
        Reset
      </button>
    </div>
  );
}

export default ControlPanel;
