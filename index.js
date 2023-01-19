const port = 8080;
require('dotenv').config();
const http = require('http');
const express = require('express');
const websocket = require('ws');
const addNewActiveUser = require('./db/add-new-active-user');
var app = express();


  const path = require('path');
  const bodyParser = require('body-parser');
  const corsMiddleware = require('./cors');

  app.options('*', corsMiddleware);
  app.use(corsMiddleware);
  app.use(bodyParser.json());
 
  // sockets 
  var server = require('http').Server(app)
  var io = require('socket.io')(server);

  const socket = io('https://bidstacker.vercel.app', {transports: ['websocket']});

  io.on("connection", (socket) => {
    console.log('WE HAVE A CONNECTION', socket);
  });


  
  // routes
  app.get('/', async (req, res) => {
      res.send({result: 'I am the result'});
  });

  app.post('/new-data', (req, res) => {
    res.send({result: 'I am the result'});
  });
  
  

  
  server.listen(port)
  console.log('On I guess');
