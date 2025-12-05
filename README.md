# Student Heatmap Simulator

A web application that simulates student movement across a campus with real-time visualization.

## Features
- Simulates 50 students moving between 5 buildings
- In-memory event tracking (last 2 minutes)
- REST API for simulation control and stats
- Interactive 2D campus map visualization
- Real-time updates via polling (every 5 seconds)

## Architecture
- **Backend:** Node.js + Express (port 5001)
- **Frontend:** React + Vite (port 3000)
- **Data:** In-memory (no database)

## Setup & Run

### Prerequisites
- Node.js v18+
- npm

### Backend
```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:5001`

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

## API Endpoints

### Control
- `POST /api/simulation/start` - Start simulation
- `POST /api/simulation/stop` - Stop simulation
- `POST /api/simulation/reset` - Reset state

### Data
- `GET /api/stats` - Get current counts + most active building
- `GET /api/health` - Health check

## Simulation Behavior
- **Movement:** Random subset of students (10-20) move every 20 seconds
- **Cleanup:** Events older than 2 minutes removed every 30 seconds
- **Buildings:** A, B, C, D, E (hardcoded positions)

## Visualization
- **Size:** Building size = current student count
- **Color:** Red = most active (last 2 min), Blue = normal
- **Layout:** Campus-like spatial arrangement

## Usage
1. Open `http://localhost:3000` in your browser
2. Click **Start** to begin the simulation
3. Watch as students move between buildings every 20 seconds
4. Buildings will resize based on student count
5. The most active building (from last 2 min) will turn red
6. Click **Stop** to pause or **Reset** to restart

## Future Enhancements
- WebSocket real-time updates
- Historical data graphs
- Configurable parameters (N students, M buildings)
- Persistent storage
- Individual student tracking
