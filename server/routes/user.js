const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const userController = require('../controllers/userController');

router.get('/', userController.view);

router.post('/adduser', userController.create);

router.get('/login', userController.loginpage);
router.get('/cards', userController.cardspage);
router.get('/dashboard', userController.dashboardpage);
router.get('/loans', userController.loanspage);
router.get('/profile', userController.profilepage);
router.get('/subscriptions', userController.subscriptionspage);
router.get('/support', userController.supportpage);
router.get('/transactions', userController.transactionspage);
router.get('/admin', userController.adminpage);

module.exports = router;