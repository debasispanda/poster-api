const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { Auth, User, Role } = require('./routes');
const { ErrorHandler, CurrentUser } = require('./middlewares');
const pool = require('./utils/pool');

const {
  SESSION_NAME = 'PosterSession',
  SESSION_SECRET = 'keyboard cat',
  SESSION_AGE = 5
} = process.env;


const createApp = () => {
  const app = express();

  app.use(express.json());

  // Session
  app.use(session({
    name: SESSION_NAME,
    store: new pgSession({
      pool
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * SESSION_AGE }
  }));
  
  app.use(CurrentUser);
  
  // Routes
  app.use('/api/auth', Auth);
  app.use('/api/roles', Role);
  app.use('/api/users', User);
  
  // Error Handler
  app.use(ErrorHandler);
  
  const APP_PORT = process.env.APP_PORT || 3000;
  
  app.listen(APP_PORT, async () => {
    console.log(`Connected to port ${APP_PORT}`);
  });
}

module.exports = createApp;
