const handleError = (err, req, res, next) => {
  if (err) {
    console.error(err);
    const { message, statusCode } = err;
    res.status(statusCode).json({ message });
  }
  next();
}

module.exports = handleError;
