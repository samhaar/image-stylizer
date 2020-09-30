/* eslint-disable */
const express = require('express');
const path = require('path');

const imageController = require('../controllers/imageController');


const router = express.Router();

router.post('/goat', imageController.saveGoat, (req, res) => {
  return res.status(200).send('DIT IT');
})

router.get('/goat', imageController.getGoat, (req, res) => {
  return res.status(200).send(res.locals.goat);
})


module.exports = router;
