import React, { useState, useEffect, useCallback } from 'react';
import ControlPanel from './components/ControlPanel';
import CampusMap from './components/CampusMap';
import './App.css';

function App() {
  const [stats, setStats] = useState({
    currentCounts: { A: 0, B: 0, C: 0, D: 0, E: 0 },
    mostActive: null,
    isRunning: false,
  });

  // Fetch stats from backend
  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }, []);

  // Poll every 5 seconds
  useEffect(() => {
    // Fetch immediately
    fetchStats();

    // Then poll every 5 seconds
    const interval = setInterval(fetchStats, 5000);

    return () => clearInterval(interval);
  }, [fetchStats]);

  // Control functions
  const handleStart = async () => {
    try {
      const response = await fetch('/api/simulation/start', { method: 'POST' });
      const result = await response.json();
      console.log(result.message);
      fetchStats(); // Refresh immediately
    } catch (error) {
      console.error('Error starting simulation:', error);
    }
  };

  const handleStop = async () => {
    try {
      const response = await fetch('/api/simulation/stop', { method: 'POST' });
      const result = await response.json();
      console.log(result.message);
      fetchStats(); // Refresh immediately
    } catch (error) {
      console.error('Error stopping simulation:', error);
    }
  };

  const handleReset = async () => {
    try {
      const response = await fetch('/api/simulation/reset', { method: 'POST' });
      const result = await response.json();
      console.log(result.message);
      fetchStats(); // Refresh immediately
    } catch (error) {
      console.error('Error resetting simulation:', error);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Student Heatmap Simulator</h1>
        <p>Tracking 50 students across 5 buildings</p>
      </header>

      <main>
        <ControlPanel
          isRunning={stats.isRunning}
          onStart={handleStart}
          onStop={handleStop}
          onReset={handleReset}
        />

        <CampusMap
          currentCounts={stats.currentCounts}
          mostActive={stats.mostActive}
        />

        <div className="stats-footer">
          {stats.mostActive && (
            <p>
              Most Active Building (last 2 min): <strong>{stats.mostActive.buildingId}</strong>
              {' '}with <strong>{stats.mostActive.count}</strong> visits
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
