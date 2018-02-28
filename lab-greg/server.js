'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const debug = require('debug')('note:server');

const cors = require('./lib/cors-middleware.js');
const errors = require('./lib/error-middleware');
const noteRouter = require('./route/note-router.js');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(morgan('dev'));
app.use(cors);
app.use(noteRouter);
app.use(errors);


app.listen(PORT, () => {
  debug(`server up on ${PORT} dude, cowabunga!`);
});
