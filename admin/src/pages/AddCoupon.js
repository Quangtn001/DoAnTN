import React, { useEffect } from "react";
import InputForm from "../components/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  createCoupon,
  getaCoupon,
  resetState,
  updateACoupon,
} from "../features/coupon/couponSlice";
let schema = Yup.object().shape({
  name: Yup.string().required("Coupon name is required"),
  expiry: Yup.date().required("Coupon expiry is required"),
  discount: Yup.number().required("Coupon discount is required"),
});

const AddCoupon = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const getCouponId = location.pathname.split("/")[3];

  const newCoupon = useSelector((state) => state.coupon);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCoupons,
    couponName,
    couponDiscount,
    couponExpiry,
    updatedCoupon,
  } = newCoupon;

  const dateFormat = (date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
    const day = newDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getaCoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdCoupons) {
      toast.success("🦄 Create coupon successfully!");
    }
    if (isSuccess && updatedCoupon) {
      toast.success("🦄 Update category successfully!");
      navigate("/admin/coupon-list");
    }
    if (isError) {
      toast.error("🦄 Create coupn failed!");
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdCoupons,
    navigate,
    couponName,
    couponDiscount,
    couponExpiry,
    updatedCoupon,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      expiry: dateFormat(couponExpiry) || "",
      discount: couponDiscount || "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        await dispatch(updateACoupon(data));
        dispatch(resetState());
      } else {
        await dispatch(createCoupon(values));
        formik.resetForm();
        await dispatch(resetState());
        navigate("/admin/coupon-list");
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4">
        {getCouponId !== undefined ? "Edit" : "Add"} Coupon
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          {formik.touched.name && formik.errors.name ? (
            <div className="text-danger">{formik.errors.name}</div>
          ) : null}
          <InputForm
            type="text"
            label="Enter coupon name"
            name="name"
            onCh={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
          />

          {formik.touched.expiry && formik.errors.expiry ? (
            <div className="text-danger">{formik.errors.expiry}</div>
          ) : null}
          <InputForm
            type="date"
            label="Enter coupon expiry"
            name="expiry"
            onCh={formik.handleChange("expiry")}
            onBlr={formik.handleBlur("expiry")}
            val={formik.values.expiry}
          />

          {formik.touched.discount && formik.errors.discount ? (
            <div className="text-danger">{formik.errors.discount}</div>
          ) : null}
          <InputForm
            type="number"
            label="Enter coupon discount"
            name="discount"
            onCh={formik.handleChange("discount")}
            onBlr={formik.handleBlur("discount")}
            val={formik.values.discount}
          />
          <button type="submit" className="btn btn-success">
            {getCouponId !== undefined ? "Edit" : "Add"} Coupon
          </button>
          {getCouponId !== undefined ? (
            <>
              <Link to="/admin/coupon-list" className="btn btn-danger ms-3">
                Back
              </Link>
            </>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
