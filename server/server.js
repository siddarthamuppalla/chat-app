const express = require('express')
const app = express();
const http = require('http').createServer(app)
const WebSocket = require('ws')


// serves static files form the public folder
app.use(express.static('client'))

// init websockets
const wss = new WebSocket.Server({server: http})

wss.on('connection', (ws1) => {
    console.log('new client connected')

    ws1.on('message', (message) => {
        console.log('Received: '+ message)

        // broadcast the msg to all the clients
        wss.clients.forEach(client => {
            if(client.readyState === WebSocket.OPEN){
                client.send(message)
            }
        })
    })

    ws1.on('close', () => {
        console.log('client disconnected')
    })
}) 

http.listen(1337, () => {
    console.log('server is running on port 1337')
})
