const mongoose = require('mongoose');
const Example = require('../models/exampleModel');

const exampleController = {};

exampleController.getMessage = function(req, res, next) {
  res.locals.message = 'Hello world from express!';

  return next();
};

module.exports = exampleController;
