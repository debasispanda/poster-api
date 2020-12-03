const bcrypt = require("bcrypt");
const { User } = require("../db");

module.exports = (route) => {
  /**
   * Login user using email and password
   */
  route.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.get_user_by_key_value("email", email);

      if (!user) {
        res.send("User doesn't exist");
      }

      if (bcrypt.compareSync(password, user.password)) {
        req.session.userId = user.id;
        res.send("Authentication Successful!");
      } else {
        res.send("Invalid username/password");
      }
    } catch (e) {
      console.error(e);
      res.send("Authentication Failed!");
    }
  });

  route.post("/logout", async (req, res) => {
    try {
      res.clearCookie("PosterSession");
      req.session.destroy();
      res.send("Successfully logged out!");
    } catch (e) {
      console.error(e);
      res.send("Logout Failed!");
    }
  });

  return route;
};
