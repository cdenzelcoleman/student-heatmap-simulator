// State
let students = [];
let buildings = ['A', 'B', 'C', 'D', 'E'];
let events = [];
let movementInterval = null;
let cleanupInterval = null;
let isRunning = false;

// Initialize students with random distribution
function initializeStudents() {
  students = [];
  for (let i = 1; i <= 50; i++) {
    const randomBuilding = buildings[Math.floor(Math.random() * buildings.length)];
    students.push({
      id: i,
      currentBuilding: randomBuilding
    });
  }
}

// Generate movement event
function moveStudents() {
  // Pick random subset (20-40% of students)
  const numToMove = Math.floor(Math.random() * 11) + 10; // 10-20 students
  const shuffled = [...students].sort(() => 0.5 - Math.random());
  const studentsToMove = shuffled.slice(0, numToMove);

  const timestamp = Date.now();

  studentsToMove.forEach(student => {
    // Pick random building (could be same one)
    const newBuilding = buildings[Math.floor(Math.random() * buildings.length)];
    student.currentBuilding = newBuilding;

    // Record event
    events.push({
      studentId: student.id,
      buildingId: newBuilding,
      timestamp: timestamp
    });
  });

  console.log(`[${new Date().toISOString()}] Moved ${numToMove} students`);
}

// Remove events older than 2 minutes
function cleanupOldEvents() {
  const twoMinutesAgo = Date.now() - (2 * 60 * 1000);
  const oldLength = events.length;
  events = events.filter(event => event.timestamp > twoMinutesAgo);
  const removed = oldLength - events.length;
  if (removed > 0) {
    console.log(`[${new Date().toISOString()}] Cleaned up ${removed} old events`);
  }
}

// Start simulation
export function startSimulation() {
  if (isRunning) {
    return { success: false, message: 'Simulation already running' };
  }

  if (students.length === 0) {
    initializeStudents();
  }

  // Move students every 20 seconds
  movementInterval = setInterval(moveStudents, 20000);

  // Cleanup old events every 30 seconds
  cleanupInterval = setInterval(cleanupOldEvents, 30000);

  isRunning = true;
  console.log('[SIMULATION] Started');
  return { success: true, message: 'Simulation started' };
}

// Stop simulation
export function stopSimulation() {
  if (!isRunning) {
    return { success: false, message: 'Simulation not running' };
  }

  clearInterval(movementInterval);
  clearInterval(cleanupInterval);
  movementInterval = null;
  cleanupInterval = null;
  isRunning = false;

  console.log('[SIMULATION] Stopped');
  return { success: true, message: 'Simulation stopped' };
}

// Reset simulation
export function resetSimulation() {
  stopSimulation();
  events = [];
  initializeStudents();
  console.log('[SIMULATION] Reset');
  return { success: true, message: 'Simulation reset' };
}

// Get current student counts per building
export function getCurrentCounts() {
  const counts = {};
  buildings.forEach(b => counts[b] = 0);

  students.forEach(student => {
    counts[student.currentBuilding]++;
  });

  return counts;
}

// Get most active building from last 2 minutes
export function getMostActiveBuilding() {
  const twoMinutesAgo = Date.now() - (2 * 60 * 1000);
  const recentEvents = events.filter(e => e.timestamp > twoMinutesAgo);

  if (recentEvents.length === 0) {
    return null;
  }

  // Count events per building
  const activityCounts = {};
  buildings.forEach(b => activityCounts[b] = 0);

  recentEvents.forEach(event => {
    activityCounts[event.buildingId]++;
  });

  // Find max
  let mostActive = { buildingId: null, count: 0 };
  Object.entries(activityCounts).forEach(([buildingId, count]) => {
    if (count > mostActive.count) {
      mostActive = { buildingId, count };
    }
  });

  return mostActive;
}

// Get simulation status
export function getStatus() {
  return {
    isRunning,
    studentCount: students.length,
    eventCount: events.length,
    buildings
  };
}

// Get all stats for frontend
export function getStats() {
  return {
    currentCounts: getCurrentCounts(),
    mostActive: getMostActiveBuilding(),
    isRunning: isRunning
  };
}
