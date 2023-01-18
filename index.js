const port = 8080;
require('dotenv').config();
const http = require('http');
const express = require('express');
const websocket = require('ws');
const addNewActiveUser = require('./db/add-new-active-user');
const app = express();

const run = async ()  => {

  const path = require('path');
  const bodyParser = require('body-parser');
  const corsMiddleware = require('./cors');

  app.options('*', corsMiddleware);
  app.use(corsMiddleware);
  app.use(bodyParser.json());


  const httpServer = http.createServer(app);
  const wss = new websocket.Server({ server: httpServer, path: '/socket' });

  wss.on('connection', function (ws, req) {
    var id = req.headers['sec-websocket-key'];

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
      
      addNewActiveUser({
        user: message,
        ws: ws
      });

    });

    ws.on('close', (reasonCode, _description) => {
      const description = _description.toString();
      
      console.log('Socket CLOSED');
      console.log(reasonCode, description);

      /*
      removeActiveUser({
        user: message,
        ws: ws
      }); */

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