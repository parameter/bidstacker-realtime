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

  console.log('We are connected');
  
    // ws.send("Hej from the server");
  

  ws.on('close', function () {
    
  });
});

server.listen(8080, function () {
  console.log('Listening on http://0.0.0.0:8080');
});

