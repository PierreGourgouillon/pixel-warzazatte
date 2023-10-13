import DataResponse from "./models/DataResponse";

export default class WebSocketManager {
    static shared = new WebSocketManager()
    webSocket: WebSocket
    private listeners: { [key: string]: Function[] } = {};

    constructor() {
        this.webSocket = new WebSocket('ws://localhost:8080')
        this.listen()
    }

    private listen() {
      this.webSocket.onmessage = (event) => {
        const response = JSON.parse(event.data);

        if (response.action in this.listeners) {
          this.listeners[response.action].forEach(callback => callback(response));
        }
      };
    }

    addListener<T>(action: string, callback: (response: T) => void) {
        if (!this.listeners[action]) {
          this.listeners[action] = [];
        }
        this.listeners[action].push(callback);
    }

    send<T>(body: DataResponse<T>) {
        if (this.webSocket.readyState === WebSocket.OPEN) {
            this.webSocket.send(JSON.stringify(body));
        } else {
            console.error('WebSocket is not open: ', this.webSocket.readyState);
        }
    }
}
