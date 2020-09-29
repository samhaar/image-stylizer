/* eslint-disable */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRouter = require('./routers/userRouter');
const sessionController = require('./controllers/sessionController');

const mongoConnect = require('./models/mongoConnect');



mongoConnect();
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/user', userRouter);


if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));

  // serve app
  app.get('/', 
  sessionController.validateSession,
  (req, res) => {
    res.sendFile(path.join(__dirname, '../client/app/index.html'));
  });
}

// 404 unknown route handler
app.use((req, res) => res.status(404).send('ruh roh, nothing like that found here'));

// global middleware error handler
app.use((err, req, res, next) => {
  res.status(500).send('Woops, something went wrong on our end');
})

app.listen(3000, () => console.log('Listening on 3000'));
