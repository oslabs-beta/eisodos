const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const authController = {
  register: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      // Check if username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      //hash the pass
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user instance with the hashed password
      const newUser = new User({ username, password: hashedPassword });
      // Save the new user to the database
      await newUser.save();
      return next();
    } catch (error) {
      console.log(error, 'Error in registration');
      return next(error);
    }
  },

  login: (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.log('Error during auth', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (!user) {
        //auth failed user not found or password incorrect
        return res.status(401).json({ message: info.message });
      }
      req.logIn(user, (err) => {
        if (err) {
          console.log('Error during login', err);
          return res.status(500).json({ message: 'Internal server error' });
        }
        //auth success , user logged in
        return res.status(200).json({ message: 'Login successful.' });
      });
    })(req, res, next);
  },

  //provided by Passport.js and is responsible
  //for clearing the user's login session and removing the user's authenticated state.
  logout: (req, res, next) => {
    req.logout(() => {
      res.status(200).json({ message: 'logout successful' });
    });
  },
};

module.exports = authController;
