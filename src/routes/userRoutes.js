const express = require('express');
const route = express.Router();
const multer = require('multer');
const upload = multer();

const userController = require('../controllers/userController');

//User 
route.post('/register', upload.none(), userController.userRegister);
route.post('/login', upload.none(), userController.userLogin);


module.exports = route;