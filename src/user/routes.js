const express = require('express');
const { get_users, save_user, delete_user } = require('./db');
const formatError = require('../utils/error');
const route = express.Router();

route.get('/', async(req, res) => {
  try {
    const users = await get_users();
    res.json(users.rows);
  } catch (error) {
    console.error(error);
    res.send(formatError(error, 'Unable to fetch users'));
  }
});

route.get('/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const user = await get_users(id);
    if (user.rows.length) {
      res.json(users.rows[0]);
    } else {
      res.json(formatError(null, 'User doesn\'t exist!'));
    }
  } catch (error) {
    console.error(error);
    res.send(formatError(error, 'Unable to fetch user'));
  }
});

route.post('/', async(req, res) => {
  try {
    const { email, firstname, lastname, password } = req.body;
    const users = await save_user(email, firstname, lastname, password);
    res.json(users.rows[0]);
  } catch (error) {
    console.error(error);
    res.send(formatError(error, 'Unable to save user information'));
  }
});

route.delete('/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const user = await delete_user(id);
    if (user) {
      res.send('User deleted successfully!');
    } else {
      res.json(formatError(null, 'User doesn\'t exist!'));
    }
  } catch (error) {
    console.error(error);
    res.send(formatError(error, 'Unable to delete user'));
  }
});

module.exports = route;
