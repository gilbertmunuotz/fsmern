var express = require('express');
var router = express.Router();
var userController = require('../controllers/UsersController');


/* GET home page. */
router.get('/', userController.getSignal);

/* Register User */
router.post('/api/register', userController.registerController);

/* Register User */
router.post('/api/login', userController.loginController);

module.exports = router;