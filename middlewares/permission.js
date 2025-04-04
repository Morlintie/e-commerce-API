const { AccessForbiddenError } = require("../errors");

const permissionMiddleware = (...roles) => {
  return (req, res, next) => {
    const { role } = req.user;
    if (!roles.includes(role)) {
      throw new AccessForbiddenError("Your are forbidden to access that route");
    }
    next();
  };
};

module.exports = permissionMiddleware;
