import { useRef, useEffect, useState } from 'react'
import DataResponse from '../models/DataResponse'
import PixelModel from '../models/PixelModel'
import WebSocketManager from '../WebSocketManager'
import ColorPicker from './ColorPicker'


const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>('');
  let canvas: HTMLCanvasElement | null = null
  let context: CanvasRenderingContext2D | null = null
  let pageId: number | null = null
  const gridSize = 50;

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  useEffect(() => {
    canvas = canvasRef.current

    if (canvas == null) return
    context = canvas.getContext('2d')
    if (context == null) return

    pageId = Math.floor(Math.random() * 100)
    console.log(pageId)

    drawGrid()
  }, [selectedColor])

  function drawGrid() {
    if (canvas == null || context === null) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const pixelSize = canvasWidth / gridSize;

    context.strokeStyle = 'lightgray';

    for (let i = 1; i < gridSize; i++) {
      const x = (i * pixelSize) + 0.5;
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, canvasHeight);
      context.stroke();
    }

    for (let i = 1; i < gridSize; i++) {
      const y = (i * pixelSize) + 0.5;
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(canvasWidth, y);
      context.stroke();
    }
  }

  function onClickCanvas(event: React.MouseEvent<HTMLCanvasElement>) {
    if (canvas == null || context === null) return;

    const canvasWidth = canvas.width;

    const pixelSize = (canvasWidth / gridSize);
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const id = `${x},${y}`;
    const pixelX = Math.floor(x / pixelSize);
    const pixelY = Math.floor(y / pixelSize);
    const pixelData = {
      action: 'draw',
      data: {
        id: id,
        x: pixelX * pixelSize,
        y: pixelY * pixelSize,
        color: selectedColor, //selectedColor.split("-")[0]
      },
      id: pageId,
    };
    drawGrid()
    WebSocketManager.shared.send(pixelData)
  }

  WebSocketManager.shared.addListener<DataResponse<PixelModel>>('draw', (response) => {
    if (context === null) return
    if (canvas === null) return
    context.fillStyle = response.data.color;
    context.fillRect(response.data.x, response.data.y, 10, 10); 
  })

  WebSocketManager.shared.addListener<DataResponse<PixelModel>>('init', (response) => {
    if (context === null) return
    if (canvas === null) return
    Object.values(response.data).forEach(p => {
      if (context === null) return
        console.log(p.color, p.x, p.y)
        context.fillStyle = p.color;
        context.fillRect(p.x, p.y, 10, 10);
    })
  })

  WebSocketManager.shared.webSocket.onclose = (event) => {
    console.log('WebSocket is closed: ', event.reason);
  };

  WebSocketManager.shared.webSocket.onerror = (error) => {
    console.error('WebSocket error: ', error);
  };
  
  return (
    <div className='flex'>
      <canvas ref={canvasRef} onClick={onClickCanvas} width="500" height="500" style={{border: "1px solid black", margin: "1rem"}}/>
      <div>
        <ColorPicker onColorChange={handleColorChange}/>
      </div>
    </div>
  )
}

export default Canvas