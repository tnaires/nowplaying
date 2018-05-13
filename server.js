const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const subscribeRouter = require('./routes/subscribe');

const PORT = 3001;

const app = express();
app.use('/subscribe', subscribeRouter);

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
