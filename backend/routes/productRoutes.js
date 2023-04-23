const express = require("express");
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const {
  createProduct,
  getaProduct,
  getallProduct,
  updateProduct,
  deleteProduct,
  addToWishList,
  rating,
} = require("../controller/productController");

router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/:id", getaProduct);
router.put("/wishlist", authMiddleware, addToWishList);
router.put("/rating", authMiddleware, rating);

router.get("/", getallProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;
