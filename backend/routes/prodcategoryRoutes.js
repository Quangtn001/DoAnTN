const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getaCategory,
  getallCategory,
} = require("../controller/categoryController");
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, isAdmin, createCategory);
router.get("/:id", getaCategory);
router.get("/", getallCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);
module.exports = router;
