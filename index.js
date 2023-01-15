const express = require('express');
const path = require('path');
const { createServer } = require('http');
const corsMiddleware = require('./cors');

const app = express();
app.use(corsMiddleware);

const WebSocket = require('ws');

const server = createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function (ws) {
  console.log('MF connection just happened', ws);
});

server.listen(8080, function () {
  console.log('Listening on http://0.0.0.0:8080');
});

