const express = require('express');

const router = express.Router();
const projectController = require('../controllers/project')

router.post('/add-project', projectController.postAddProject);
router.get('/get-projects', projectController.getProjects)

module.exports = router;