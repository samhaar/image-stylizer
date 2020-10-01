/* eslint-disable */
const express = require('express');
const path = require('path');

const imageController = require('../controllers/imageController');
const sessionController = require('../controllers/sessionController');


const router = express.Router();

router.get('/images',
  sessionController.validateSession,
  imageController.getLibrary,
  (req, res, next) => {
    return res.status(200).json(res.locals.library);
  }
)

router.post('/images',
  sessionController.validateSession,
  imageController.saveImage,
  (req, res) => {
    return res.status(200).json(res.locals.data);
  }
);

router.delete('/images',
  sessionController.validateSession,
  imageController.deleteImage,
  (req, res) => {
    return res.status(200).json(res.locals.success);
  }
);  

// router.post('/goat', imageController.saveGoat, (req, res) => {
//   return res.status(200).send('DIT IT');
// })

// router.get('/goat', imageController.getGoat, (req, res) => {
//   return res.status(200).send(res.locals.goat);
// })


module.exports = router;
