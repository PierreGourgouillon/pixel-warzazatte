import { useRef, useEffect, MouseEventHandler } from 'react'
import DataResponse from '../models/DataResponse'
import PixelModel from '../models/PixelModel'
import WebSocketManager from '../WebSocketManager'

const Canvas = ({ ws }: { ws: WebSocket }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  let canvas: HTMLCanvasElement | null = null
  let context: CanvasRenderingContext2D | null = null
  let pageId: number | null = null

  useEffect(() => {
    canvas = canvasRef.current

    if (canvas == null) return
    context = canvas.getContext('2d')
    if (context == null) return

    pageId = Math.floor(Math.random() * 100)
    console.log(pageId)
  }, [])

  function onClickCanvas(event: React.MouseEvent<HTMLElement>) {
    if (canvas == null) return
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const id = `${x},${y}`;
    const pixelData = { action: 'draw', data: { id, x, y, color: 'black' }, id: pageId };
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

  WebSocketManager.shared.addListener('clear', (_) => {
    if (context === null) return
    if (canvas === null) return
    context.clearRect(0, 0, canvas.clientWidth, canvas.height)
  })

ws.onclose = (event) => {
  console.log('WebSocket is closed: ', event.reason);
};

ws.onerror = (error) => {
  console.error('WebSocket error: ', error);
};

  return <canvas ref={canvasRef} onClick={onClickCanvas} width="500" height="500"/>
}

export default Canvas