/* eslint-disable */
const express = require('express');
const path = require('path');

const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.get('/',
  sessionController.validateSession,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
)

router.post('/login',
  userController.validateInput,
  userController.authenticate, 
  sessionController.setJWT,
  (req, res) => res.redirect('/')
);


router.post('/signup',
  userController.validateInput,
  userController.checkIfDuplicateEntry,
  userController.createNewUser,
  sessionController.setJWT,
  (req, res) => res.redirect('/')
);

module.exports = router;
