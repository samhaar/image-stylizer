/* eslint-disable */
const jwt = require('jsonwebtoken');
const { SECRET, EXPIRATION_TIME_IN_SECS } = require('../utils/jwtConstants');

const sessionController = {};

sessionController.setJWT = (req, res, next) => {
  const jwtOptions = {
    expiresIn: EXPIRATION_TIME_IN_SECS,
  };

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + (EXPIRATION_TIME_IN_SECS + 60) * 1000),
  };

  const { username, id } = res.locals.userDoc;
  const payload = {
    sub: id,
    username: username,
  }

  jwt.sign(payload, SECRET, jwtOptions, (err, token) => {
    if (err) return next(err);
    res.cookie('jwt', token, cookieOptions);
    return next();
  });
};

sessionController.validateSession = (req, res, next) => {
  const redirect = () => res.redirect('/auth');

  if (!req.cookies) return redirect();

  const token = req.cookies.jwt;
  if (!token) return redirect();

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return redirect();

    const { sub, username } = decoded;
    res.locals.user = {
      username,
      id: sub,
    };
    return next();
  });
};

module.exports = sessionController;
