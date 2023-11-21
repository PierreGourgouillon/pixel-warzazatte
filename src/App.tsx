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
    if (username !== "") {
      const newUsername: UserModel = { name: username }
      const body: DataResponse<UserModel> = { action: "add-user", data: newUsername }
      WebSocketManager.shared.send(body)
      setConnected(true)
    }
  }

  return (
    <div className="App">
      {!isConnected && (
        <div style={{ display: "flex", justifyContent: "center",  }} className="flex-col content-center items-center h-screen">
          <h1 className='text-black font-bold text-5xl'>Bienvenue sur Pixel Warzazatte</h1>
          <input className="w-60 my-10 border-black border-solid focus:outline-none" onChange={(event) => { setUsername(event.target.value) }} value={username} placeholder='Veuillez choisir un pseudo'/>
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
