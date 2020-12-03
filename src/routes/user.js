const bcrypt = require("bcrypt");
const { User } = require("../db");
const { Auth } = require("../middlewares");
const AppError = require("../utils/error");
const Response = require('../utils/response');

module.exports = (route) => {
  route.get("/", Auth.isAuthenticated, async (req, res, next) => {
    try {
      const data = await User.get_users();
      const allUsers = data.rows.map((user) => extractPassword(user));
      res.json(new Response(allUsers).toJSON());
    } catch (error) {
      next(new AppError(error, 500));
    }
  });

  route.get("/:id", Auth.isAuthenticated, async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await User.get_user_by_key_value("id", id);
      if (data) {
        const user = extractPassword(data);
        res.json(new Response(user).toJSON())
      } else {
        next(new AppError("User not found!", 404));
      }
    } catch (error) {
      next(new AppError(error, 500));
    }
  });

  route.post("/", async (req, res, next) => {
    try {
      const { email, firstname, lastname, password } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      const users = await User.save_user(
        email,
        firstname,
        lastname,
        hashPassword
      );
      res.json(extractPassword(users.rows[0]));
    } catch (error) {
      next(new AppError(error, 500));
    }
  });

  route.delete("/:id", Auth.isAuthenticated, async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.delete_user(id);
      if (user) {
        res.send("User deleted successfully!");
      } else {
        next(new AppError("User not found!", 404));
      }
    } catch (error) {
      next(new AppError(error, 500));
    }
  });

  return route;
};

function extractPassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
