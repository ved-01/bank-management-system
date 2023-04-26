const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const userController = require('../controllers/userController');



router.get('/', userController.view);


router.get('/login', userController.loginpage);
router.get('/cards', userController.cardspage);
router.get('/dashboard', userController.dashboardpage);
router.get('/loans', userController.loanspage);
router.get('/profile', userController.profilepage);
router.get('/subscriptions', userController.subscriptionspage);
router.get('/support', userController.supportpage);
router.get('/transaction', userController.transactionspage);
router.get('/admin', userController.viewallusers);

router.post('/adduser', userController.create);
router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/adminlogin', userController.adminloginpage)

// router.get('/adminuser', userController.viewallusers);

module.exports = router;