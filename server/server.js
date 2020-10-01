/* eslint-disable */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRouter = require('./routers/userRouter');
const apiRouter = require('./routers/apiRouter');
const sessionController = require('./controllers/sessionController');

const mongoConnect = require('./models/mongoConnect');

mongoConnect();
const app = express();

app.use(bodyParser.json({ limit: '5mb' }));
app.use(cookieParser());

// routers
app.use('/user', userRouter);
app.use('/api', apiRouter);

// app route
if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.resolve(__dirname, '../build/')));

  app.get('/auth', (req, res) => {
    return res.sendFile(path.join(__dirname, '../client/authenticate/index.html'));
  });

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
