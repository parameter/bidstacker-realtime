const port = 8080;
require('dotenv').config();
const http = require('http');
const express = require('express');
const websocket = require('ws');
const app = express();
const getMongoDb = require('./db/db.js');


const run = async ()  => {

  const db = await getMongoDb();

  db.collection('test').insertOne({'ytrewq': 666})

  const path = require('path');
  const bodyParser = require('body-parser');
  const corsMiddleware = require('./cors');

  app.options('*', corsMiddleware);
  app.use(corsMiddleware);
  app.use(bodyParser.json());


  const httpServer = http.createServer(app);
  const wss = new websocket.Server({ server: httpServer, path: '/socket' });

  var clients = [];

  wss.on('connection', function (ws, req) {
    var id = req.headers['sec-websocket-key'];

    // add client to an array
    clients.push({'id': id, 'ws': ws});

    console.log('We are connected to this ID hopefully WTF ', id);

    /*
    setTimeout(() => {
      clients.forEach((client) => {
        console.log('Try to send to ', client.id);
        client.ws.send('A message from the server to ' + client.id);
      });
    },10000) */

    ws.on('message', (data, isBinary) => {
      const message = isBinary ? data : data.toString();
      console.log('client message is: ', message);
    });

    ws.on('close', function () {
      console.log('Closed already');
    });
  }); 

  httpServer.listen( port, function() {
      console.log( 'listening on wft ' + port );
  });

  app.get('/test', (req, res) => {
    res.json({ wtf: 'nothing here' });
  });

  app.post('/new-negotiation', (req, res) => {
    console.log('The other server says: ', req.body);
    res.json({ wtf: req.body });
  });

}

run();