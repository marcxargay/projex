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
