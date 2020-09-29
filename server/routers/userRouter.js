/* eslint-disable */
const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/login', (req, res) => {
  console.log('in user/login');
  console.log(path.join(__dirname, './client/login.html'));
  return res.sendFile(path.join(__dirname, '../../client/login.html'));
});



module.exports = router;