const express = require("express");
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const {
  uploadPhoto,
  productImgResize,
} = require("../middlewares/uploadImages");
const {
  createProduct,
  getaProduct,
  getallProduct,
  updateProduct,
  deleteProduct,
  addToWishList,
  rating,
  uploadImages,
  deleteImages,
} = require("../controller/productController");

router.post("/", authMiddleware, isAdmin, createProduct);
router.put(
  "/upload-images",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);

router.get("/:id", getaProduct);
router.put("/wishlist", authMiddleware, addToWishList);
router.put("/rating", authMiddleware, rating);

router.get("/", getallProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;
