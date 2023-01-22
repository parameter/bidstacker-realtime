const port = 8080;
require('dotenv').config();
const http = require('http');
const express = require('express');
const addNewActiveUser = require('./db/add-new-active-user');
var app = express();


  const path = require('path');
  const bodyParser = require('body-parser');
  const corsMiddleware = require('./cors');

  app.options('*', corsMiddleware);
  app.use(corsMiddleware);
  app.use(bodyParser.json());
 
 const { Server } = require("socket.io");

  const server = http.createServer(app);

  const io = new Server(server, {
    path: "/",
    cors: {
      origin: "https://whale-app-a6c8t.ondigitalocean.app",
      allowedHeaders: ["Access-Control-Allow-Origin"],
      credentials: false
    }
  });

  io.on("connection", (socket) => {
    console.log('WE HAVE A CONNECTION', socket);
  });



  // routes 
  app.get('/', async (req, res) => {
      res.send({result: 'I am the result'});
  });

  app.post('/new-data', (req, res) => {
    console.log('req.body',req.body);
    res.send({result: 'I am the result'});
  });

  
  server.listen(port)
  console.log('On I guess');
