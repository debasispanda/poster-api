const express = require('express');
const route = express.Router();

/**
 * Login user using email and password
 */
route.post('/login', async(req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    res.send('Authentication Successful!');
  } catch (e) {
    console.error(e)
    res.send('Authentication Failed!');
  }
});

module.exports = route;
