var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
})

socket.on('disconnect', function () {
    console.log('Connection is down');
})

socket.on('newMessage', function (message) {
    var formattedDate = new moment(message.createdAt).format('h:mm a')
    addMessage({
      from: message.from,
      text: message.text,
      date: formattedDate
    });
})

socket.on('newLocationMessage', function (message) {
  var formattedDate = new moment(message.createdAt).format('h:mm a')
  addLocationMessage({
    from: message.from,
    url: message.url,
    date: formattedDate
  })
})

function addMessage(message) {
  var template = document.getElementById('message-template').innerHTML;
  var html = Mustache.render(template, message);

  var messages = document.getElementById('messages');
  messages.insertAdjacentHTML('beforeend', html);
}

function addLocationMessage(message) {
  var template = document.getElementById('location-message-template').innerHTML;
  var html = Mustache.render(template, message);

  var messages = document.getElementById('messages');
  messages.insertAdjacentHTML('beforeend', html);
}

document.getElementById('messages-form')
  .addEventListener('submit', function (e) {
      e.preventDefault();
      var messageInput = this.message;

      if (!messageInput.value.length) {
        return;
      }

      socket.emit('createMessage', {
          from: 'User',
          text: messageInput.value
      }, function (message) {
        messageInput.value = '';
      })
  })

locationButton = document.getElementById('send-location')
locationButton
  .addEventListener('click', function () {
    if (!navigator.geolocation) {
      alert('geolocation is not supported by your browser.')
    }

    locationButton.setAttribute('disabled', 'disabled')
    locationButton.innerText = 'Sending location...'

    navigator.geolocation.getCurrentPosition(function (position) {
      locationButton.removeAttribute('disabled')
      locationButton.innerText = 'Send location'

      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    }, function () {
      locationButton.removeAttribute('disabled')
      locationButton.innerText = 'Send location'
      alert('Unable to fetch the location')
    })
  })
