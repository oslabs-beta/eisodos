const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const userRouter = require('./routes/user');
const app = express();

// Assign constants
const PORT = 3000;
const mongoURI =
  'mongodb+srv://mmohtasin93:ospproject1@cluster0.7yyq5ou.mongodb.net/?retryWrites=true&w=majority';

// Connect to mongo database
mongoose.connect(mongoURI, {
  dbName: 'test',
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Require routers

// Parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Setup session middleware
app.use(
  session({
    secret: 'testKey', //TODO: need to add to a env file
    resave: false,
    saveUninitialized: false,
  })
);

// Start the passport middleware
require('./config/passport'); // this line should be here
app.use(passport.initialize());
app.use(passport.session());

// Route handlers
app.use('/api/users', userRouter);

// Unknown route handler
app.use('*', (req, res) => {
  return res.status(404).send('404 Not Found');
});

// Global error handler
app.use((err, req, res, next) => {
  console.log(`Express caught an unknown middleware error: ${err}`);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).send(message);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});

module.exports = app;
