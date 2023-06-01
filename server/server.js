const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const userRouter = require('./routes/user');
const app = express();

// assign constants
const PORT = 3000;
const mongoURI =
  'mongodb+srv://mmohtasin93:ospproject1@cluster0.7yyq5ou.mongodb.net/?retryWrites=true&w=majority';

// connect to mongo database
mongoose.connect(mongoURI, {
  dbName: 'test',
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// require routers

// parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// setup session middleware
app.use(
  session({
    secret: 'testKey', //TODO: need to add to a env file
    resave: false,
    saveUninitialized: false,
  })
);

// start the passport middleware
require('./config/passport'); // this line should be here
app.use(passport.initialize());
app.use(passport.session());

// route handlers
app.use('/api/users', userRouter);

// unknown route handler
app.use('*', (req, res) => {
  return res.status(404).send('404 Not Found');
});

// global error handler
app.use((err, req, res, next) => {
  console.log(`Express caught an unknown middleware error: ${err}`);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).send(message);
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});

module.exports = app;
