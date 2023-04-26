import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/products/productSlice";
import categoryReducer from "../features/category/categorySlice";
import enquiryReducer from "../features/Enquiry/enquirySlice";
import uploadReducer from "../features/upload/uploadSlice";
import couponRuducer from "../features/coupon/couponSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    category: categoryReducer,
    enquiry: enquiryReducer,
    upload: uploadReducer,
    coupon: couponRuducer,
  },
});
