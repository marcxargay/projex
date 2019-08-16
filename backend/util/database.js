const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const db_name = 'projex';
let _db;

const connectionURL = 'mongodb://127.0.0.1:27017'

exports.mongoConnect = cb => {
  MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true  })
    .then(client => {
      console.log('connected');
      _db = client.db(db_name);
      cb();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}

exports.getDb = () => {
  if(_db) {
    return _db;
  }
  throw 'Database not found';
}