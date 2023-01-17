'use strict';

const port = 8888;
const http = require('http');
const express = require('express');
const websocket = require('ws');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
const corsMiddleware = require('./cors');

app.options('*', corsMiddleware);
app.use(corsMiddleware);
app.use(bodyParser.json());

app.use( express.static('public') );


const httpServer = http.createServer( credentials, app );
const wss = new websocket.Server({ server: httpServer, path: '/socket' });

httpServer.listen( port, function listening() {
    console.log( 'listening on ' + port );
});

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

