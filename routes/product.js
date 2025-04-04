const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const authenticateMiddleware = require("../middlewares/authenticate");
const permissionMiddleware = require("../middlewares/permission");

router.use(authenticateMiddleware);

router.get("/", getAllProducts);
router.post("/", permissionMiddleware("admin"), postProduct);
router.get("/:id", getProduct);
router.patch("/:id", permissionMiddleware("admin"), updateProduct);
router.delete("/:id", permissionMiddleware("admin"), deleteProduct);

module.exports = router;
