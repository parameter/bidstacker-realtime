var MongoClient = require('mongodb').MongoClient;

async function getMongoDb() {
  var mongoClient = null;
  mongoClient = new MongoClient(process.env.MONGODB_URI);
  const connection = await mongoClient.connect();
  const db = connection.db('bidstacker');

  return db;
}

module.exports = getMongoDb;
