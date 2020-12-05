const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { Auth, User, Role } = require('./routes');
const { ErrorHandler, CurrentUser } = require('./middlewares');
require('dotenv/config');

const app = express();

app.use(express.json());

const {
  SESSION_NAME = 'PosterSession',
  SESSION_SECRET = 'keyboard cat',
  SESSION_AGE = 5
} = process.env;

// Session
app.use(session({
  name: SESSION_NAME,
  store: new pgSession(),
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Connected to port ${PORT}`);
});
