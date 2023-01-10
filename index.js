const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

const mongoDB_url = 'mongodb+srv://vercel-admin-user:IkTvQkmsdCnx1gsW@cluster0.vp8fpep.mongodb.net/bidstacker?retryWrites=true&w=majority';

async function main() {

    try {
        // connecting to mongo
        const mongoClient = new MongoClient(mongoDB_url);
        await mongoClient.connect();
    } catch (error) {
        console.error(error);
    } finally {
        if (mongoClient) {
            await mongoClient.close();
        }
    }
    
    
    // our routes
    app.get('/', (req, res) => {
    
        res.send(JSON.stringify(error));
    });
}

main();

app.listen(port, () => console.log(`sample-expressjs app listening on port ${port}!`));
