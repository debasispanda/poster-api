const { User } = require("../db");

const currentUser = async (req, res, next) => {
  const { userId } = req.session;
  if (userId) {
    const user = await User.get_by_key_value("id", userId);
    if (user) {
      req.user = user;
    }
  }

  next();
};

module.exports = currentUser;
