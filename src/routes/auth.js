const { Router } = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../db");
const {
  BadRequestError,
  AuthError,
  NotFoundError,
  ServerError,
} = require("../utils/error");
const { Response } = require("../utils/response");

const route = Router();

/**
 * Login user using email and password
 */
route.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      next(new BadRequestError());
    }

    const user = await User.get_by_key_value("email", email);

    if (!user) {
      next(new NotFoundError("User not found!"));
    }

    if (bcrypt.compareSync(password, user.password)) {
      req.session.userId = user.id;
      res.json(new Response(null, "Authentication Successful!"));
    } else {
      next(new AuthError("Invalid username/password!"));
    }
  } catch (error) {
    next(new ServerError(error));
  }
});

route.post("/logout", async (req, res, next) => {
  try {
    res.clearCookie(process.env.SESSION_NAME);
    req.session.destroy();
    res.json(new Response(null, "Successfully logged out!"));
  } catch (error) {
    next(new ServerError(error));
  }
});

module.exports = route;
