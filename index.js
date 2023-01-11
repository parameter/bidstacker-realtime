const express = require('express');
var http = require('http');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

const mongoDB_url = 'mongodb+srv://vercel-admin-user:IkTvQkmsdCnx1gsW@cluster0.vp8fpep.mongodb.net/?retryWrites=true&w=majority';

async function main() {

    var server = http.createServer(app);
    // Pass a http.Server instance to the listen method
    var io = require('socket.io').listen(server);

    // The server should start listening
    server.listen(666);

    io.on("connection", (socket) => {
        console.log('WE HAVE A CONNECTION', socket);
    });



    try {


    } catch (error) {
        console.error(error);
    } finally {
        /*
        if (mongoClient) {
            await mongoClient.close();
        } */
    }

    const insertSomething = async () => {

        var mongoClient = null;
        mongoClient = new MongoClient('mongodb+srv://vercel-admin-user:IkTvQkmsdCnx1gsW@cluster0.vp8fpep.mongodb.net/?retryWrites=true&w=majority');
        const connection = await mongoClient.connect();
        const db = connection.db('bidstacker');

        return db.collection('test').insertOne({test: 'I am a test, no more'});
    }

    
    
    
    // our routes
    app.get('/', async (req, res) => {

        var res_ = await insertSomething();
    
        res.send('We are Live!');
    });

    app.post('/new-data', (req, res) => {
    
        res.send({result: 'I am the result'});
    });
}

main();

app.listen(port, () => console.log(`sample-expressjs app listening on port ${port}!`));
