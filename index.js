const express = require('express');
const path = require('path');
const { createServer } = require('http');

const WebSocket = require('ws');

const app = express();

const server = createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function (ws) {

  console.log('MF connection just happened');


});

server.listen(8080, function () {
  console.log('Listening on http://0.0.0.0:8080');
});