const express = require("express");
const {registration,verifyOTP, login, verifyUser, logout } = require("../Controllers/registration");
const {getUser} = require('../Controllers/user')
const {verifyToken} = require('../Middlewares/verify')

const router = express.Router();

router.post('/create-user',registration)
router.post('/verify-otp',verifyOTP)
router.post('/login',login)
router.get('/verify-user',verifyUser)
router.get('/get-user/:userId',verifyToken,getUser)
router.post('/log-out',logout)


module.exports = router;