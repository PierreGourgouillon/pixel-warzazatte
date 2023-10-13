import { useState } from 'react';
import './App.css';
import Game from './Game';
import Canvas from './components/Canvas';
import Chat from './components/Chat';
import WebSocketManager from './WebSocketManager';

function App() {
  const [game, _] = useState<Game>(new Game())
  const ws: WebSocket = new WebSocket('ws://localhost:8080');

  function onClickResetButton() {
    WebSocketManager.shared.send({ action: 'clear', data: null })
  }

  return (
    <div className="App" style={{ border: "1px solid blue", display: "flex", flexDirection: 'row' }}>
      <Canvas ws={ws}></Canvas>
      <button id="clear-canvas" onClick={onClickResetButton}>Reinitialiser</button>
      <Chat></Chat>
    </div>
  );
}

export default App;
