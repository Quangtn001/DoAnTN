const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");
const validateMonggoDbId = require("../utils/validateMongodbId");

// creatCoupon
const creatCoupon = asyncHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.json(newCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCoupons = asyncHandler(async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (error) {
    throw new Error(error);
  }
});

const getACoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMonggoDbId(id);
  try {
    const coupon = await Coupon.findById(id);
    res.json(coupon);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMonggoDbId(id);
  try {
    const updateCoupons = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCoupons);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMonggoDbId(id);
  try {
    const deleteCoupon = await Coupon.findByIdAndDelete(id);
    res.json(deleteCoupon);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  creatCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
  getACoupon,
};
