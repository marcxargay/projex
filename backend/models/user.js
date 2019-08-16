const { getDb } = require('../util/database');

class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  save(cb) {
    const db = getDb();
    db.collection('users')
      .find({ 'email': this.email })
      .toArray()
      .then(users => {
        console.log(users)
        if (users.length > 0) {
          cb(0)
        } else {
          db.collection('users').insertOne(this)
            .then((user) => {
              cb(1)
            })
            .catch(err => { throw err })
        }
      })
      .catch(err => { throw err })
    // console.log(cursor)
  }
}

module.exports = User;