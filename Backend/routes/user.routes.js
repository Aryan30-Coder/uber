const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const userController = require('../contollers/user.controller')
const authMiddleWare = require('../middlewares/auth.middleware')

router.post('/register', [
    body('email').isEmail().withMessage("Invaild Email"),
    body('fullname.firstname').isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
    body('fullname.lastname').isLength({ min: 3 }).withMessage("Last name must be at least 3 characters long")
],
    userController.registerUser
)

router.post('/login', [
    body('email').isEmail().withMessage("Invaild Email"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
],
    userController.loginUser
)

router.get('/profile', authMiddleWare.authUser, userController.getUserProfile)

router.get('/logout', authMiddleWare.authUser, userController.LogoutUser)

module.exports = router;