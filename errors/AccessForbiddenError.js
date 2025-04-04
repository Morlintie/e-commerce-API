const CustomAPIError = require("./customAPIError");
const { StatusCodes } = require("http-status-codes");

class AccessForbiddenError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = AccessForbiddenError;
