const express = require("express");
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getallEnquiry,
} = require("../controller/enqController");

router.post("/", createEnquiry);
router.put("/:id", authMiddleware, isAdmin, updateEnquiry);
router.delete("/:id", authMiddleware, isAdmin, deleteEnquiry);
router.get("/", getallEnquiry);
router.get("/:id", getEnquiry);
module.exports = router;
