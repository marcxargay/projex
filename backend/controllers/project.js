const Project = require('../models/project');

exports.postAddProject = (req, res, next) => {
  const title = req.body.title;
  const userName = req.body.userName;

  const project = new Project(title, userName)

  project.save(project => {
    if (project) {
      res.status(201).send({ message: 'Project created'})
    } else {
      res.status(500).send({ message: 'Error: Project not created'})
    }
  })
}

exports.getProjects = (req, res, next) => {
  Project.fetchAll(projects => {
    if (projects) {
      res.send(projects)
    } else {
      res.status(500).send({ message: 'Error: Cannot fetch projects'})
    }
  });

}