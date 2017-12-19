const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');

app.use(express.static('public'));

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// listens for connection from client
io.on('connection', (socket) => {
  // server-side confirmation of connection
  console.log('Someone has connected.');

  // server sends message to client
  // .broadcast sends to all other clients other than the client that sent the message
  socket.broadcast.emit('message', `A new user, ${Date.now()}, has connected`);

  // server listens for message from the client on default message 'channel'
  socket.on('message', (message) => {
    console.log(`The new user's name is ${message.username}, and his message is: ${message.text}`);
  });

  // server listens on mission 'channel'
  socket.on('mission', (message) => {
    console.log('Mission message: ', message);
  });


  // server listens for disconnection from client (close tab/window)
  socket.on('disconnect', () => {
    console.log('A user has disconnected.');
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('Your server is up and running on Port 3000. Good job!');
});
