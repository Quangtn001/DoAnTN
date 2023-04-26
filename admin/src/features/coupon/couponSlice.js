import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import couponService from "./couponService";

export const getCoupon = createAsyncThunk(
  "coupon/get-coupons",
  async (thunkAPi) => {
    try {
      return await couponService.getCoupons();
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);
export const createCoupon = createAsyncThunk(
  "coupon/create-coupons",
  async (coupon, thunkAPi) => {
    try {
      return await couponService.createCoupons(coupon);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const deleteACoupon = createAsyncThunk(
  "coupon/delete-coupon",
  async (id, thunkAPi) => {
    try {
      return await couponService.deleteACoupon(id);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const updateACoupon = createAsyncThunk(
  "coupon/update-coupon",
  async (coupon, thunkAPi) => {
    try {
      return await couponService.updateACoupon(coupon);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const getaCoupon = createAsyncThunk(
  "coupon/get-coupon",
  async (id, thunkAPi) => {
    try {
      return await couponService.getCoupon(id);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");
const initialState = {
  coupons: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.coupons = action.payload;
      })
      .addCase(getCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCoupons = action.payload;
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteACoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteACoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCoupon = action.payload;
      })
      .addCase(deleteACoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getaCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getaCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.couponName = action.payload.name;
        state.couponDiscount = action.payload.discount;
        state.couponExpiry = action.payload.expiry;
      })
      .addCase(getaCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateACoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateACoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCoupon = action.payload;
      })
      .addCase(updateACoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default couponSlice.reducer;
