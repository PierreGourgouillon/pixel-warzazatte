import './App.css';
import WebSocketManager from './WebSocketManager';
import Canvas from './components/Canvas';
import Chat from './components/Chat';
import { useState } from 'react';
import UserModel from './models/UserModel';
import DataResponse from './models/DataResponse';

function App() {
  const [isConnected, setConnected] = useState(false)
  const [username, setUsername] = useState<string>("")

  function onButtonJoinClick(event: React.MouseEvent<HTMLElement>) {
    const newUsername: UserModel = { name: username }
    const body: DataResponse<UserModel> = { action: "add-user", data: newUsername }
    WebSocketManager.shared.send(body)
    setConnected(true)
  }

  return (
    <div className="App">
      {!isConnected && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input onChange={(event) => { setUsername(event.target.value) }} value={username}/>
          <button onClick={onButtonJoinClick}>Join</button>
        </div>
      )}
      {isConnected && (
        <div style={{ display: "flex", flexDirection: 'row' }}>
          <Canvas></Canvas>
          <Chat userName={username}></Chat>
        </div>
      )}
    </div>
  );
}

export default App;
