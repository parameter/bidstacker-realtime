const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

const mongoDB_url = 'mongodb+srv://vercel-admin-user:IkTvQkmsdCnx1gsW@cluster0.vp8fpep.mongodb.net/bidstacker?retryWrites=true&w=majority';

async function main() {

    try {

        // connecting to mongo 
        var mongoClient = null;
        mongoClient = new MongoClient(mongoDB_url);
        const connection = await mongoClient.connect();
        const db = connection.db('bidstacker');

    } catch (error) {
        console.error(error);
    } finally {
        if (mongoClient) {
            await mongoClient.close();
        }
    }

    const insertSomething = async () => {
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
