const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const userController = require('../controllers/userController');

router.get('/', userController.view);

router.post('/adduser', userController.create);

router.post('/login', userController.login)

module.exports = router;