const { Response } = require("../utils/response");

const handleError = (err, req, res, next) => {
  if (err) {
    console.error(err);
    const { message, statusCode } = err;
    res.status(statusCode).json(new Response(null, message));
  } else {
    next();
  }
};

module.exports = handleError;
