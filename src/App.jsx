import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { World } from './components/World/World';
import { musicManager } from './utils/musicManager';

function App() {
  const [audioReady, setAudioReady] = useState(false);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        musicManager.resume();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const handleStartAudio = useCallback(() => {
    setAudioReady(true);
    musicManager.start();
  }, []);

  return (
    <div className="app-container">
      <World />
      {!audioReady && (
        <button type="button" className="audio-start-button" onClick={handleStartAudio}>
          Play Music
        </button>
      )}
    </div>
  );
}

export default App;
