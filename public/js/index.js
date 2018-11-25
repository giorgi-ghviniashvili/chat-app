var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
})

socket.on('disconnect', function () {
    console.log('Connection is down');
})

socket.on('newMessage', function (message) {
    addMessage(message);
})

function addMessage(message) {
  var newMessage = document.createElement('div');
  newMessage.innerHTML = `${message.from}: ${message.text}`

  var messages = document.getElementById('messages');
  messages.appendChild(newMessage);
}

document.getElementById('messages-form')
  .addEventListener('submit', function (e) {
      e.preventDefault();
      var messageInput = this.message;

      socket.emit('createMessage', {
          from: 'User',
          text: messageInput.value
      }, function (message) {
        messageInput.value = '';
      })
  })
