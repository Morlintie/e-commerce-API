const express = require("express");
const router = express.Router();
const {
  getOrders,
  getOrder,
  getUserOrders,
  getProductOrders,
  postOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");
const authenticateMiddleware = require("../middlewares/authenticate");
const permissionMiddleware = require("../middlewares/permission");

router.use(authenticateMiddleware);

router.get("/", permissionMiddleware("admin"), getOrders);
router.get("/:id", getOrder);
router.get("/user/:id", getUserOrders);
router.get("/product/:id", permissionMiddleware("admin"), getProductOrders);
router.post("/", postOrder);
router.patch("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
