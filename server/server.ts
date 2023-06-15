import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

// Import routers
import usersRouter from './routes/users';
import dashboardRouter from './routes/dashboard';
// import clusterRouter from './routes/clusterRoutes';
// import nodeRouter from './routes/nodesRoutes';
// import podRouter from './routes/podsRoutes';

// Assign constants
const app = express();
const PORT = 3000;
const mongoURI =
  'mongodb+srv://mmohtasin93:ospproject1@cluster0.7yyq5ou.mongodb.net/?retryWrites=true&w=majority';

// Connect to mongo database
mongoose.connect(mongoURI, { dbName: 'test' });

// Parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Setup session middleware
app.use(
  session({
    secret: 'testKey', //TODO: need to add to an env file
    resave: false,
    saveUninitialized: false
  })
);

// Start the passport middleware
require('./config/passport'); // this line should be here
app.use(passport.initialize());
app.use(passport.session());

// Route handlers
app.use('/api/users', usersRouter);
app.use('/api/dashboard', dashboardRouter);

// Unknown route handler
app.use('*', (req, res) => {
  return res.status(404).send('404 Not Found');
});

// TODO: move this to a separate type declaration file?
interface CustomError {
  log?: string;
  status?: number;
  message?: string;
}

// Global error handler
// TODO: is there a better type to use for Express middleware errors?
app.use(
  (
    err: Error | CustomError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    /* eslint-disable-line */
    const defaultErr = {
      log: `Express caught an unknown middleware error: ${err}`,
      status: 500,
      message: 'Internal Server Error'
    };

    const { log, status, message } = Object.assign({}, defaultErr, err);

    console.log(log);
    return res.status(status).send(message);
  }
);

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});

module.exports = app;
