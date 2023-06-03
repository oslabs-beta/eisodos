import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import UserModel, { UserDocument } from '../models/User';

// Config passport localstrat for username/password
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Check if provided username exists in database
      const user: UserDocument | null = await UserModel.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Invalid username or password' });
      }

      // Check if provided password matches hashed password
      const isMatch: boolean = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Invalid username or password' });
      }

      // Auth success, pass user to done callback
      return done(null, user);
    }
    catch (err) {
      return done(err);
    }
  })
);

// Serialize the user object to store in the session
// Used to extract a unique identifier from the user object and store it in the session
// This identifier allows Passport.js to recognize the user and retrieve their data when needed

// TODO: extend Express.User in @types/Express?
interface User {
  id?: string;
}

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

// Deserialize the user object from the session
// Needed to fetch the user's information from the database based on the serialized ID stored in the session
// It ensures the user's data is available for auth
passport.deserializeUser(async (id:string, done) => {
  try {
    const user: UserDocument | null = await UserModel.findById(id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } 
  catch (err) {
    return done(err);
  }
});

export default passport; 
