const express = require('express');
const userController = require('../controllers/authController');
const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/verify', userController.verifyCode);
router.post('/token', userController.verifyUserId);
router.get('/me', userController.getUserData);
router.post("/forgottenPassword",userController.forgottenPassword)
router.post("/resetPassword",userController.passwordReset);
router.get("/allUsers",userController.getAllUsers)
module.exports = router;
