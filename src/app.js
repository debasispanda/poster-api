const express = require('express');
const { auth } = require('./auth/index');
const { user } = require('./user');
const { create_tables } = require('./utils/db');

const app = express();

app.use(express.json());

// Routes
app.use('/api/auth', auth);
app.use('/api/users', user);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Connected to port ${PORT}`);
  try {
    await create_tables();
  } catch (error) {
    console.error(error);
  }
});
