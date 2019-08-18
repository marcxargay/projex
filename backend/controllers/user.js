const User = require('../models/user');

exports.postAddUser = (req, res, next) => {

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const user = new User(name, email, password)
  console.log(user)
  user.save(code => {
    if (code === 1) {
      res.status(201).send({ code, message: 'User created' });
    } else {
      res.status(201).send({ code, message: 'User exists' });
    }
  })
}


// FIX get user
exports.updateScore = (req, res) => {

  const id = req.body.id;
  const score = req.body.score;

  User.updateScore(id, score)
    .then(result => {
      if (result['modifiedCount'] > 0) {
        Project.findById(id).then(project => {
          res.send({
            message: 'Score Updated.',
            value: Math.floor(project.score.value)
          });
        })
          .catch(err => { res.send(err); })

      } else {
        res.send({ message: 'Cannot Update Score.' });
      }
    })
    .catch(err => { res.send(err); })

}

exports.updateLikes = (req, res) => {
  const id = req.body.id;
  const value = req.body.value;

  User.like(id, value)
    .then(result => {
      if (result['modifiedCount'] > 0) {
        Project.findById(id).then(project => {
          res.send({
            message: 'Likes Updated.',
            value: project.score.liked
          });
        })
          .catch(err => { res.send(err); })

      } else {
        res.send({ message: 'Already liked/disliked.' });
      }
    })
    .catch(err => { res.send(err); })
}