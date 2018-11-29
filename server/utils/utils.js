const generateMessage = (from, text) => {
  return {
    from: from,
    text: text,
    createdAt: new Date().getTime()
  }
}

const generateLocationMessage = (from, latitude, longitude) => {
  return {
    from: from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: new Date().getTime()
  }
}

const generateTypingMessage = (usersNames) => {
  var typeMessage = null;

  if (usersNames.length) {
    if (usersNames.length == 1) {
      typeMessage = `${usersNames[0]} types...`
    } else {
      typeMessage = `${usersNames.join(', ')} are typing...`
    }
  }

  return typeMessage
}

module.exports = {generateMessage, generateLocationMessage, generateTypingMessage}
