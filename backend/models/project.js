const { getDb } = require('../util/database');

class Project {
  constructor(title, userName) {
    this.title = title;
    this.userName = userName
  }
  save(cb) {
    const db = getDb();
    db.collection('projects').insertOne(this)
      .then(project => {
        cb(project);
      })
      .catch(err => { throw err })
  }

  static fetchAll(cb) {
    const db = getDb();
    db.collection('projects').find({}).toArray()
      .then(projects => {
        cb(projects);
      })
      .catch(err => {
        throw err;
      });
  }
}

module.exports = Project;