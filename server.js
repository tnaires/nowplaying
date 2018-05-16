require('dotenv').config();

const express = require('express');
const path = require('path');
const http = require('http');

const configSocketIO = require('./config/socketio');
const configRoutes = require('./config/routes');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());

const server = http.createServer(app);
const io = configSocketIO(server);

configRoutes(app, io);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
