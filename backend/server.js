import express from 'express';
import cors from 'cors';
import {
  startSimulation,
  stopSimulation,
  resetSimulation,
  getStats
} from './simulation.js';

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Get stats (current counts + most active building)
app.get('/api/stats', (req, res) => {
  try {
    const stats = getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start simulation
app.post('/api/simulation/start', (req, res) => {
  try {
    const result = startSimulation();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Stop simulation
app.post('/api/simulation/stop', (req, res) => {
  try {
    const result = stopSimulation();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reset simulation
app.post('/api/simulation/reset', (req, res) => {
  try {
    const result = resetSimulation();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET  /api/stats');
  console.log('  GET  /api/health');
  console.log('  POST /api/simulation/start');
  console.log('  POST /api/simulation/stop');
  console.log('  POST /api/simulation/reset');
});
