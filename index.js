'use strict';

const express = require('express');
const path = require('path');
const { createServer } = require('http');
const corsMiddleware = require('./cors');

const app = express();
app.options('*', corsMiddleware);
app.use(corsMiddleware);

const WebSocket = require('ws');

console.log('HERE we are again');

const server = createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function (ws) {

  console.log('We are connected ',ws.id);
  
    wss.clients[ws].send("Hej " + ws.id + " from the server");
  

  ws.on('close', function () {
    console.log('Closed already');
  });
});

server.listen(8080, function () {
  console.log('Listening on http://0.0.0.0:8080');
});

