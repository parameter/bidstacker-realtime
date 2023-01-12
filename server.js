const express = require('express');
const mongoose = require('mongoose');

const app = express();

//CORS
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  'mongodb+srv://vercel-admin-user:IkTvQkmsdCnx1gsW@cluster0.vp8fpep.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

const port = process.env.PORT || 1337;
const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);
const io = require('socket.io')(server, { origins: 'https://bidstacker.vercel.app' });

io.on('connection', (socket) => {
  console.log(`A user connected: ${socket.id}`);

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
