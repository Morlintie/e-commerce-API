const express = require("express");
const {
  getAllUsers,
  getUser,
  showUser,
  updateUser,
  deleteUser,
  updatePassword,
} = require("../controllers/user");
const authenticateMiddleware = require("../middlewares/authenticate");
const permissionMiddleware = require("../middlewares/permission");
const router = express.Router();

router.get(
  "/",
  authenticateMiddleware,
  permissionMiddleware("admin"),
  getAllUsers
); //admin only
router.get("/show/:id", authenticateMiddleware, showUser);
router.patch("/password", authenticateMiddleware, updatePassword);
router.get("/:id", authenticateMiddleware, getUser);
router.patch("/:id", authenticateMiddleware, updateUser);
router.delete("/:id", authenticateMiddleware, deleteUser);

module.exports = router;
