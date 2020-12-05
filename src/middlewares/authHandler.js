const { AuthError } = require("../utils/error");
const { Response } = require("../utils/response");

const authHandler = (req, res, next) => {
  const { userId } = req.session;
  if (!userId) {
    const { message, statusCode } = new AuthError();
    res.status(statusCode).json(new Response(null, message));
  } else {
    next();
  }
};

module.exports = authHandler;
