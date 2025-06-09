import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 4001 });
wss.on('connection', (socket) => {
    console.log('Connection established');
    socket.send('Server is sending this message');
    try {
        socket.on('message', (message) => {
            const messageInString=message.toString()
            const data=JSON.parse(messageInString)
            if(data.type=="JOIN"){
                socket.send(data.payload.message)
            }
            if(data.type=="CHAT"){
                socket.send(data.payload.message)
            }
            if(data.type=="LEAVE"){
                socket.send(data.payload.message)
            }
        });
    } catch (error) {
        console.log(error);
    }
});

console.log('WebSocket server is running on ws://localhost:4001');