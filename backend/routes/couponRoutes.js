const express = require("express");
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const {
  creatCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
  getACoupon,
} = require("../controller/couponController");

router.post("/", authMiddleware, isAdmin, creatCoupon);
router.get("/", authMiddleware, isAdmin, getAllCoupons);
router.get("/:id", authMiddleware, isAdmin, getACoupon);
router.put("/:id", authMiddleware, isAdmin, updateCoupon);
router.delete("/:id", authMiddleware, isAdmin, deleteCoupon);

module.exports = router;
