require('dotenv').config();

const express = require('express');
const http = require('http');

const configSocketIO = require('./config/socketio');
const configRoutes = require('./config/routes');

const PORT = 3001;

const app = express();
const server = http.createServer(app);
const io = configSocketIO(server);

configRoutes(app, io);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
