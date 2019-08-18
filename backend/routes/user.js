const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();


router.post('/create-user', userController.postAddUser)
router.post('/update-score', userController.updateScore);
router.post('/update-likes', userController.updateLikes);

module.exports = router;