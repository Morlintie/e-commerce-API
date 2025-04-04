const jwt = require("jsonwebtoken");

const createCookie = async (payload, res) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  const oneMonth = 1000 * 60 * 60 * 24 * 30;
  res.cookie("token", token, {
    httpOnly: true,
    signed: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + oneMonth),
  });
};

const verifyCookie = async (req) => {
  try {
    const token = req.signedCookies.token;

    const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET);

    return verifiedToken;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createCookie,
  verifyCookie,
};
