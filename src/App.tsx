import './App.css';
import Canvas from './components/Canvas';
import Chat from './components/Chat';

function App() {
  return (
    <div className="App" style={{ border: "1px solid blue", display: "flex", flexDirection: 'row' }}>
      <Canvas></Canvas>
      <Chat></Chat>
    </div>
  );
}

export default App;
