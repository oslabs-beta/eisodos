const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');

//config tthe passport localstrat for username/password

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Find user in DB with provided username
      const user = await User.findOne({ username });

      if (!user) {
        // User not found, auth failed
        return done(null, false, { message: 'Invalid username or password' });
      }

      // Compare the provided password and hashed password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        // Passwords don't match, auth failed
        return done(null, false, { message: 'Invalid username or password' });
      }

      // Auth success, pass user to done callback
      return done(null, user);
    } catch (err) {
      // Pass error to done callback
      return done(err);
    }
  })
);

//serialize the user object to store in the session
//used to extract a unique identifier from the user object and store it in the session. This identifier allows Passport.js to recognize the user and retrieve their data when needed.
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//deserialize the user object from the session
//needed to fetch the user's information from the database based on the serialized ID stored in the session. It ensures  the user's data is available for auth
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

module.exports = passport;
