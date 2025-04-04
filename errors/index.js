const CustomAPIError = require("./customAPIError.js");
const BadRequestError = require("./BadRequestError.js");
const UnauthorizedError = require("./UnauthorizedError.js");
const AccessForbiddenError = require("./AccessForbiddenError.js");
const NotFoundError = require("./NotFoundError.js");

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnauthorizedError,
  AccessForbiddenError,
  NotFoundError,
};
