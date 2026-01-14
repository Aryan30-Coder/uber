const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../contollers/cpatain.controller');
const authMiddleWare = require('../middlewares/auth.middleware')

router.post('/register', [
    body('email').isEmail().withMessage('Invalid message'),
    body('fullname.firstname').isLength( { min: 3 }).withMessage('First name should be at least 3 characters long'),
    body('password').isLength( { min: 6 }).withMessage('Password should be at least 6 characters long'),
    body('vehicle.color').isLength( { min: 3 }).withMessage('Vehicle color should be at least 3 characters long'),
    body('vehicle.plate').isLength( { min: 3 }).withMessage('Vehicle plate should be at least 3 characters long'),
    body('vehicle.capacity').isInt( { min: 1 }).withMessage('Vehicle capacity should be at least 1'),
    body('vehicle.vehicleType').isIn(['Car', 'Bike', 'Auto']).withMessage('Vehicle type must be Car, Bike, or Auto')
],
    captainController.registerCaptain
)


router.post('/login', [
    body('email').isEmail().withMessage('Invalid message'),
    body('password').isLength( { min: 6 }).withMessage('Password should be at least 6 characters long')
],
    captainController.loginCaptain
)

router.get('/profile', authMiddleWare.authCaptain, captainController.getCaptainProfile)

router.get('/logout', authMiddleWare.authCaptain, captainController.logoutCaptain)


module.exports = router;