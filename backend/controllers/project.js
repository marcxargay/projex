const Project = require('../models/project');

exports.postAddProject = (req, res) => {
  const title = req.body.title;
  const user_id = req.body.user_id;
  const description = req.body.description ? req.body.description : null;
  const link = req.body.link ? req.body.link : null;
  const tags = req.body.tags ? req.body.tags : null;

  const project = new Project(title, user_id, null, description, link, tags)

  project.save()
    .then(result => {
      if (result.insertedCount > 0) {
        res.status(201).send({ message: 'Project created' })
      } else {
        res.status(500).send({ message: 'Error: Project not created' })
      }
    })
    .catch(err => { res.send(err); })
}

exports.getProjects = (req, res) => {

  Project.fetchAll()
    .then(projects => {
      if (projects) {
        res.send(projects)
      } else {
        res.status(500).send({ message: 'Error: Cannot fetch projects' })
      }
    })
    .catch(err => { res.send(err); })
}

exports.getProejct = (req, res) => {
  Project.findById(req.params.projectId)
    .then(project => {
      res.send(project);
    })
    .catch(err => { res.send(err); })
}

exports.postDeleteProject = (req, res) => {
  Project.deleteById(req.params.projectId)
    .then(result => {
      if (result['deletedCount'] > 0) {
        res.send({ message: 'Project Deleted.' })
      } else {
        res.send({ message: 'Project not found.' })
      }
    })
    .catch(err => { res.send(err); })
}

exports.postUpdateProject = (req, res) => {
  const title = req.body.title;
  const user_id = req.body.user_id;
  const description = req.body.description;
  const id = req.body.id;
  const link = req.body.link;
  const tags = req.body.tags;

  const project = new Project(title, user_id, id, description, link, tags)

  project.update()
    .then(result => {
      if (result['modifiedCount'] > 0) {
        res.send({ message: 'Project Modified.' });
      } else {
        res.send({ message: 'Cannot Modify Project.' });
      }
    })
    .catch(err => { res.send(err); })
}
