'use strict';

const express = require('express');
const path = require('path');
const { createServer } = require('http');
const bodyParser = require('body-parser');
const corsMiddleware = require('./cors');

const app = express();
app.options('*', corsMiddleware);
app.use(corsMiddleware);
app.use(bodyParser.json());

const expressServer = createServer(app);

/*
const WebSocket = require('ws');

const wss = new WebSocket.Server({ 
  port: 8080, 
  clientTracking: true 
});

var clients = [];

wss.on('connection', function (ws, req) {
  var id = req.headers['sec-websocket-key'];

  // add client to an array
  clients.push({'id': id, 'ws': ws});

  console.log('We are connected to this ID hopefully WTF ', id);
  console.log(wss.clients);

  setTimeout(() => {
    clients.forEach((client) => {
      console.log('Try to send to ', client.id);
      client.ws.send('A message from the server to ' + client.id);
    });
  },10000)
  

  ws.on('close', function () {
    console.log('Closed already');
  });
}); 
*/

app.get('/', (req, res) => {
  
  res.json({ wtf: 'nothing here' });
});

app.post('/new-negotiation', (req, res) => {
  
  res.json({ wtf: req.body });
});

expressServer.listen(888, function () {
  console.log('Listening on http://0.0.0.0:888');
});

