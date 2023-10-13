import { useState } from 'react';
import './App.css';
import Game from './Game';
import Canvas from './components/Canvas';
import Chat from './components/Chat';
import WebSocketManager from './WebSocketManager';

function App() {
  const [game, _] = useState<Game>(new Game())

  return (
    <div className="App" style={{ border: "1px solid blue", display: "flex", flexDirection: 'row' }}>
      <Canvas></Canvas>
      <Chat></Chat>
    </div>
  );
}

export default App;
