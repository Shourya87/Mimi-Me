const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  } else {
    return res.status(403).json({
      title: "Access Denied",
      message: "Only admin can perform this action.",
    });
  }
};

module.exports = admin;
