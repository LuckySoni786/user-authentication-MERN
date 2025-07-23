const express = require('express');
const route = express.Router();
const {signup , login} = require('../controllers/userController');
const {signupValidation , loginValidation} = require('../middleware/authValidation')


route.post('/register', signupValidation,signup);
route.post('/login', loginValidation,login);


module.exports = route;