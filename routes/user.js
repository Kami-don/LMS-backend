const express = require('express')
const router = new express.Router()
const {
  register,
  login,
  updatePassword,
  updateUser
} = require('../controller/userController/userController')
const { auth } = require('../middleware/auth')


router.post('/login', login);
router.post('/register', register);
router.post('/updatepassword', auth, updatePassword);
router.post('/updateuser', auth, updateUser);

module.exports = router
