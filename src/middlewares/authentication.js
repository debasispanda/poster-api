const isAuthenticated = (req, res, next) => {
  const { userId } = req.session;
  if (!userId) {
    res.status(401).json({
      message: "User is not logged in!",
    });
  } else {
    next();
  }
};

module.exports = { isAuthenticated };
