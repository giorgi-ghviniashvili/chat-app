const express = require('express')
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')

const port = process.env.PORT || 3000
const publicDir = path.join(__dirname, '../public')

var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicDir))

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the Chat App!'
    })

    socket.broadcast.emit('newMessage', {
      from: 'Admin',
      text: 'New user joined'
    })

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', message);
        callback(message)
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    })
})

server.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
})
