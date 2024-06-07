const jwt = require("jsonwebtoken");
const User = require("../model/User");

const isVerfied = async (req, res, next) => {
  console.log(req.cookies);
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Login required",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this route",
      });
    }
    next();
  };
};

module.exports = { isVerfied, authorizeRoles };
