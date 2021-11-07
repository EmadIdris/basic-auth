'use strict';
//--------------------------------------------------------------------------------------- import lib
const express = require('express');
const server = express();
const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
//---------------------------------------------------------------------------------------for Auth
server.use(express.urlencoded({ extended: true }));
//---------------------------------------------------------------------------------------for req.body
server.use(express.json());
//---------------------------------------------------------------------------------------import function 
const { signUp, signIn } = require('./auth/auth')
//---------------------------------------------------------------------------------------Routes
//--------------------------------------------------------------------------------------- 1 
server.get('/', (req, res) => {
  res.status(200).send(' Welco~~~~~~~~~~~~~~~~~~~me')
})
//--------------------------------------------------------------------------------------- 2
server.post('/signup',signUp, async (req, res,next) => {
    res.status(200).json(req.record);
});
//--------------------------------------------------------------------------------------- 3
server.post('/signin', signIn, (req, res, next) => {
  res.status(200).json(req.user)
});
//---------------------------------------------------------------------------------------
server.use('*', notFoundHandler);
server.use(errorHandler);
//---------------------------------------------------------------------------------------MW
function start(PORT) {
  server.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
}
//--------------------------------------------------------------------------------------- export for index in global
module.exports = {
  server: server,
  start: start
};
