const { getDb } = require('../util/database');
const mongodb = require('mongodb');
class Project {
  constructor(title, user_id, id, description, link, tags) {
    this.title = title;
    this.user_id = user_id ? new mongodb.ObjectId(user_id) : null;
    this.description = description;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.link = link;
    this.tags = tags;
    this.score = { value: null, votes: 0, sum: 0 };
    this.liked = { likes: 0, dislikes: 0 };
  }

  save() {
    const db = getDb();
    return db.collection('projects').insertOne(this)
  }

  update() {
    const db = getDb();
    return db.collection('projects')
      .updateOne({ _id: this._id }, { $set: this })

  }

  static fetchAll() {
    const db = getDb();
    return db.collection('projects').find({}).toArray()
      .then(projects => {
        console.log(projects);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(projectId) {
    const db = getDb();
    return db.collection('projects')
      .find({ _id: new mongodb.ObjectId(projectId) })
      .next()
      .then(project => {
        console.log(project);
        return project;
      })
      .catch(err => { throw err; });
  }

  static deleteById(projectId) {
    const db = getDb();

    return db.collection('projects')
      .deleteOne({ _id: new mongodb.ObjectId(projectId) })
  }

  static updateScore(id, score) {
    const db = getDb();

    return this.findById(id).then(project => {

      let pScore = project.score;
      pScore.sum += score;
      pScore.votes++;
      pScore.value = pScore.sum / pScore.votes;

      pScore.users.push(id);

      project.score = pScore;

      return db.collection('projects')
        .updateOne({ _id: project._id }, { $set: project })
    })
  }

}

module.exports = Project;