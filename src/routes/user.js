const { Router } = require("express");
const { User } = require("../db");
const { AuthHandler } = require("../middlewares");
const {
  BadRequestError,
  NotFoundError,
  ServerError,
} = require("../utils/error");
const { Response } = require("../utils/response");

const route = Router();

route.get("/", AuthHandler, async (req, res, next) => {
  try {
    const data = await User.get_all();
    const users = data.map((user) => extractPassword(user));
    res.json(new Response(users));
  } catch (error) {
    next(new ServerError(error));
  }
});

route.get("/:id", AuthHandler, async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await User.get_by_key_value("id", id);
    if (data) {
      const user = extractPassword(data);
      res.json(new Response(user));
    } else {
      next(new NotFoundError("User not found!"));
    }
  } catch (error) {
    next(new ServerError(error));
  }
});

route.post("/", async (req, res, next) => {
  try {
    const { email, firstname, lastname, password, roles } = req.body;
    const data = await User.save(email, firstname, lastname, password, roles);
    const user = extractPassword(data);
    res.json(new Response(user));
  } catch (error) {
    next(new ServerError(error));
  }
});

route.delete("/:id", AuthHandler, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.delete_one(id);
    if (user) {
      res.json(new Response(null, "User deleted successfully!"));
    } else {
      next(new NotFoundError("User not found!"));
    }
  } catch (error) {
    next(new ServerError(error));
  }
});

function extractPassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

module.exports = route;
