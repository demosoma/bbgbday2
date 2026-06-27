import React from 'react';
import './App.css';
import { World } from './components/World/World';
import { useGameStore } from './stores/gameStore';

function App() {
  const player = useGameStore((state) => state.player);
  const camera = useGameStore((state) => state.camera);

  return (
    <div className="app-container">
      {/* Visual Instruction Header Overlay */}
      <div className="instruction-overlay">
        <h1 className="instruction-title">Project Babygirl</h1>
        <div className="instruction-subtitle">Use WASD or Arrow Keys to Walk</div>
      </div>

      {/* Main Interactive World Engine */}
      <World />

      {/* Real-time coordinates Debug Panel for verification */}
      <div className="debug-panel">
        <div><strong>ENGINE STATE (PHASES 1-4)</strong></div>
        <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '6px 0' }} />
        <div>Player X: {Math.round(player.x)}px</div>
        <div>Player Y: {Math.round(player.y)}px</div>
        <div>Direction: {player.dir.toUpperCase()}</div>
        <div>Moving: {player.isMoving ? 'YES' : 'NO'}</div>
        <div>Camera X: {Math.round(camera.x)}px</div>
      </div>
    </div>
  );
}

export default App;
