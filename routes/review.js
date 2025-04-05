const express = require("express");
const {
  getReviews,
  getOneUserReviews,
  getOneProductReviews,
  getReview,
  postReview,
  updateReview,
  deleteReview,
} = require("../controllers/review");
const authenticateMiddleware = require("../middlewares/authenticate");
const permissionMiddleware = require("../middlewares/permission");
const router = express.Router();

router.use(authenticateMiddleware);

router.get("/", permissionMiddleware("admin"), getReviews);
router.get("/user/:id", getOneUserReviews);
router.get("/product/:id", getOneProductReviews);
router.get("/:id", getReview);
router.post("/", postReview);
router.patch("/:id", updateReview);
router.delete("/:id", deleteReview);

module.exports = router;
