import { useRef, useEffect, MouseEventHandler } from 'react'
import DataResponse from './DataResponse'

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
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(pixelData));
    } else {
        console.error('WebSocket is not open: ', ws.readyState);
    }
  }

  ws.onmessage = (event) => {
    if (context === null) return
    if (canvas === null) return
    const response: DataResponse = JSON.parse(event.data);
    console.log(response.action, response.data)
    if(response.action === 'draw') {
        context.fillStyle = response.data.color;
        context.fillRect(response.data.x, response.data.y, 10, 10);  
    }
    else if (response.action === 'init'){
        Object.values(response.data).forEach(p => {
          if (context === null) return
            console.log(p.color, p.x, p.y)
            context.fillStyle = p.color;
            context.fillRect(p.x, p.y, 10, 10);  
        })
    } else if (response.action === "clear") {
      context.clearRect(0, 0, canvas.clientWidth, canvas.height)
    }
};

ws.onclose = (event) => {
  console.log('WebSocket is closed: ', event.reason);
};

ws.onerror = (error) => {
  console.error('WebSocket error: ', error);
};

  return <canvas ref={canvasRef} onClick={onClickCanvas} width="500" height="500"/>
}

export default Canvas