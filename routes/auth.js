const { signUp, login, logout } = require("../controllers/auth");
const authenticateMiddleware = require("../middlewares/authenticate");
const express = require("express");
const router = express.Router();

router.post("/signup", signUp);

router.post("/login", login);

router.get("/logout", authenticateMiddleware, logout);

module.exports = router;
