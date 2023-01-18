const getMongoDb = require('./db.js');


const addNewActiveUser = async () => {
    const db = await getMongoDb();
}

// db.collection('test').insertOne({'ytrewq': 666})

module.exports = addNewActiveUser;