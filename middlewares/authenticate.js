const { verifyCookie } = require("../utils");
const { UnauthorizedError } = require("../errors");

const authenticateMiddleware = async (req, res, next) => {
  const { name, role, email, userId } = await verifyCookie(req);
  if (!name || !role || !email || !userId) {
    throw new UnauthorizedError("You are not authorized");
  }
  req.user = { name, role, email, userId };

  next();
};

module.exports = authenticateMiddleware;
