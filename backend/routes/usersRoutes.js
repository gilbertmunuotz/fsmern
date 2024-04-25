var express = require('express');
var router = express.Router();
var { protect } = require('../middlewares/authmiddleware');
var userController = require('../controllers/UsersController');


/* GET home page. */
router.get('/', userController.getSignal);

/* Register User */
router.post('/api/register', userController.registerController);

/* Register User */
router.post('/api/login', userController.loginController);

/* Logout User */
router.get('/api/logout', userController.logoutController);

/* Get User Profile Data */
router.get('/api/myprofile/:id', protect, userController.getUserProfileData);

/* Get User Profile Data */
router.get('/api/loggedin', userController.checkUserStatus);

/* Update User Profile */
router.put('/api/update', protect, userController.updateMyProfile);

module.exports = router;