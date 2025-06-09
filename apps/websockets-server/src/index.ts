import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 4001 });
wss.on('connection', (socket) => {
    console.log('Connection established');
    socket.send('Server is sending this message');
    try {
        socket.on('message', (message) => {
            const messageInString=message.toString()
            const data=JSON.parse(messageInString)
            socket.send(data)
            // console.log(JSON.parse(messageInString))
        });
    } catch (error) {
        console.log(error);
    }
});

console.log('WebSocket server is running on ws://localhost:4001');