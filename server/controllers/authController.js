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
        return res.json({ message: 'Username already exists' });
      }

      // Hash the pass
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
        return res.json({ message: 'Internal server error' });
      }

      // Auth failed, user not found, or password incorrect
      if (!user) {
        return res.json({ message: info.message });
      }

      req.logIn(user, (err) => {
        if (err) {
          console.log('Error during login', err);
          return res.json({ message: 'Internal server error' });
        }

        // Auth success , user logged in
        return next();
      });
    })(req, res, next);
  },

  // Provided by Passport.js and is responsible
  // For clearing the user's login session and removing the user's authenticated state.
  logout: (req, res, next) => {
    req.logout(() => {
      res.json({ message: 'logout successful' });
    });
  },
};

module.exports = authController;
