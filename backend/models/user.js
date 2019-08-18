const { getDb } = require('../util/database');
const Project = require('../models/project');
class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.liked = [];
    this.scored = [];
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
  like(id, value) {
    const db = getDb();
    return Project.findById(id).then(project => {

      if (value > 0) {
        project.likes.like++;
      } else {
        project.likes.dislikes++;
      }
      this.liked.push(project._id);

      return db.collection('projects')
        .updateOne({ _id: project._id }, { $set: project })
    })
  }
  score() {
    const db = getDb();

    return Project.findById(id).then(project => {

      let pScore = project.score;
      pScore.sum += score;
      pScore.votes++;
      pScore.value = pScore.sum / pScore.votes;

      this.scored.push(id);

      project.score = pScore;

      return db.collection('projects')
        .updateOne({ _id: project._id }, { $set: project })
    })
  }
}

module.exports = User;