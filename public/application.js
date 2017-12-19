// import socket.io (from script in HTML file)
// combined with io 'on connection' event in server.js, creates connection
const socket = io();

// allows frontend to act on connection
socket.on('connect', () => {
  // client-side confirmation of connection
  console.log('You have connected!'); // This will log to the browser's console, not the terminal

  // send message to server
  // .send always uses default message 'channel'
  socket.send({
    username: 'Bob Loblaw',
    text: 'Check out my law blog.'
  });

  // server sends over mission 'channel'
  // cannot use .send because it is using default message 'channel'
  // use .emit with channel name as first argument
  socket.emit('mission', 'This is a mission.');
});

// listens for message
socket.on('message', (message) => {
  console.log('Something came along on the "message" channel:', message);
  $('.messages').append(`
    <div class='messages'>
      <p class='message-text'>${message}</p>
    </div>`);
});
