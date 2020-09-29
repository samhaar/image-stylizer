/* eslint-disable */
const express = require('express');
const router = express.Router();
const path = require('path');

const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');

const userModel = require('../models/userModel');




if (process.env.NODE_ENV === 'production') {

  router.get('/login', (req, res) => {
    return res.sendFile(path.join(__dirname, '../../client/login/login.html'));
  });

  router.get('/signup', (req, res) => {
    return res.sendFile(path.join(__dirname, '../../client/signup/signup.html'));
  });

}

router.post('/login', 
  userController.authenticate, 
  sessionController.setJWT,
  (req, res) => res.redirect('/')
);


router.post('/signup',
  userController.checkIfDuplicateEntry,
  userController.createNewUser,
  sessionController.setJWT,
  (req, res) => res.redirect('/')
);



module.exports = router;