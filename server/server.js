const express = require('express')
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')

const {generateMessage, generateLocationMessage} = require('./utils/utils')
const {isRealString} = require('./utils/validations.js')
const {Users} = require('./utils/users')

const port = process.env.PORT || 3000
const publicDir = path.join(__dirname, '../public')

var app = express()
var server = http.createServer(app)
var io = socketIO(server)
var users = new Users();

app.use(express.static(publicDir))

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (params, callback) => {
      if (!isRealString(params.name) || !isRealString(params.room)) {
        return callback('Name and room name are require.')
      }

      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);

      io.to(params.room).emit('updateUsersList', users.getUsersList(params.room))
      socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App!'))

      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined`))

      callback();
    })

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
          io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }

        callback(message)
    })

    socket.on('createLocationMessage', function (coords) {
      var user = users.getUser(socket.id);

      if (user) {
        io.to(user.room).emit(
          'newLocationMessage',
          generateLocationMessage(user.name, coords.latitude, coords.longitude))
      }
    })

    socket.on('disconnect', () => {
      var user = users.removeUser(socket.id);

      if (user) {
        io.to(user.room).emit('updateUsersList', users.getUsersList(user.room));
        io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} left`));
      }
    })
})

server.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
})
