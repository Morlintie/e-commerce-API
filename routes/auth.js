// sing up, login, logout, sign out
const { signUp, login, signOut, logout } = require("../controllers/auth");
const express = require("express");
const router = express.Router();

router.post("/signup", signUp);

router.post("/login", login);

router.get("/logout", logout);

router.post("/signout", signOut);

module.exports = router;
