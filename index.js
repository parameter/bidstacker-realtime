const port = 8080;
require('dotenv').config();
const http = require('http');
const express = require('express');
const websocket = require('ws');
const addNewActiveUser = require('./db/add-new-active-user');
const app = express();

// socket-io 
const { Server } = require("socket.io");


const run = async ()  => {

  const path = require('path');
  const bodyParser = require('body-parser');
  const corsMiddleware = require('./cors');

  app.options('*', corsMiddleware);
  app.use(corsMiddleware);
  app.use(bodyParser.json());

  

  const io = new Server({
    path: "/socket",
    cors: {
      origin: "https://bidstacker.vercel.app",
      credentials: false
    }
  });

  io.on("connection", (socket) => {
    console.log('The Frakker is working!');
  });

  io.listen(port);

  

  app.get('/test', (req, res) => {
    res.json({ wtf: 'nothing here' });
  });

  app.post('/new-negotiation', (req, res) => {
    console.log('The other server says: ', req.body);
    res.json({ wtf: req.body });
  });

}

run();