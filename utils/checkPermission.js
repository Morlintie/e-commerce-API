const { UnauthorizedError } = require("../errors");

const checkPermission = (id, userId, role) => {
  if (!(role === "admin")) {
    if (!(id === userId)) {
      throw new UnauthorizedError(
        "Your are not authorized to perform that action"
      );
    }
  }
};

module.exports = checkPermission;
