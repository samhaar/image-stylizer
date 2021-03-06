/* eslint-disable */
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const userController = {};

userController.validateInput = (req, res, next) => {
  if (!req.body) return next('no user info in body');

  const { username, password } = req.body;
  if (!username
    || !password
    || typeof username !== 'string'
    || typeof password !== 'string'
  ) return next('missing username or pasword data');

  return next();
};

userController.checkIfDuplicateEntry = async (req, res, next) => {
  const { username } = req.body;
  
  try {
    const results = await User.find({ username });
    if (results.length > 0){
      return res.json({ duplicateEntry: true });
    }
    return next();
  }
  catch(err) {
    return next(err);
  }
};

userController.createNewUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const userDoc = await User.create({ username, password });
    res.locals.userDoc = userDoc;
    return next();
  } 
  catch(err) {
    return next(err);
  }
}

userController.authenticate = async (req, res, next) => {
  const reject = () => res.json({ loginFailure: true });
  
  const { username, password } = req.body;

  try {
    const userDoc = await User.findOne({ username });
    if (!userDoc) return reject();
    
    const isPwValid = await bcrypt.compare(password, userDoc.password);
    if(!isPwValid) return reject();
    
    res.locals.userDoc = userDoc;
    return next();
  }
  catch(err) {
    return next(err);
  }
};

module.exports = userController;
