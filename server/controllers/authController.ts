import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import bcrypt from 'bcryptjs';

import User, { UserDocument } from '../models/User';

const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;

      // Check if username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.json({ message: 'Username already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user instance with the hashed password
      const newUser = new User({ username, password: hashedPassword });

      // Save the new user to the database
      await newUser.save();

      return next();
    } catch (error) {
      return next({ log: `Error in registration: ${error}` });
    }
  },

  // TODO: use async/await and try/catch here?
  login: (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: Error, user: UserDocument) => {
      // TODO: is Error the correct type to use?
      if (err) {
        return next({ log: `Error in auth(login): ${err}` });
      }

      // Auth failed, user not found, or password incorrect
      if (!user) {
        return next({
          log: `Error in auth(userSearch): ${err}`,
          status: 400,
          message: 'Help'
        });
      }

      req.logIn(user, (err) => {
        if (err) {
          return next({ log: `Error in login: ${err}` });
        }

        // Auth success, user logged in
        return next();
      });
    })(req, res, next);
  },

  // This is provided by Passport.js
  // Responsible for clearing the user's login session and removing the user's authenticated state
  logout: (req: Request, res: Response, next: NextFunction) => {
    /* eslint-disable-line */
    req.logout(() => {
      res.json({ message: 'logout successful' });
    });
  }
};

export default authController;
