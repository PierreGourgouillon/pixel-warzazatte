const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let pixels = {};
let chatMessages = []

wss.on('connection', (ws) => {
    ws.send(JSON.stringify({ action: 'init', data: pixels }));
    ws.send(JSON.stringify({ action: 'init-chat', data: chatMessages }));

    ws.on('message', (response) => {
        const { action, data } = JSON.parse(response);
        console.log(action, data)

        if (action === 'draw') {
            pixels[data.id] = data;
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({action,data}));
                }
            });
        }

        if (action === 'clear') {
            pixels = {}
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ action: 'clear' }));
                }
            });
        }

        if (action === 'chat') {
            data.date = getTime()
            chatMessages.push(data)
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ action, data }));
                }
            });
        }
    });
});

function getTime() {
    const date = new Date()
    return date.getHours() + ":" + date.getMinutes()
}

server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});