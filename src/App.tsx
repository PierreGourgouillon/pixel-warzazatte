import { useState } from 'react';
import './App.css';
import Game from './Game';
import Canvas from './Canvas';

function App() {
  const [game, _] = useState<Game>(new Game())
  const ws: WebSocket = new WebSocket('ws://localhost:8080');

  function onClickResetButton() {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ action: 'clear' }));
    } else {
        console.error('WebSocket is not open: ', ws.readyState);
    }
  }

  return (
    <div className="App">
      <Canvas ws={ws}></Canvas>
      <button id="clear-canvas" onClick={onClickResetButton}>Reinitialiser</button>
    </div>
  );
}

export default App;
