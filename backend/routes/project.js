const express = require('express');

const router = express.Router();
const projectController = require('../controllers/project');

router.post('/add-project', projectController.postAddProject);
router.get('/get-projects', projectController.getProjects);
router.get('/get-project/:projectId', projectController.getProejct);
router.post('/delete-project/:projectId', projectController.postDeleteProject);
router.post('/update-project', projectController.postUpdateProject);


module.exports = router;