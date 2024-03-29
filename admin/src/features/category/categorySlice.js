import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

export const getCategories = createAsyncThunk(
  "category/get-categories",
  async (thunkAPi) => {
    try {
      return await categoryService.getCategories();
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const getACategory = createAsyncThunk(
  "category/get-category",
  async (id, thunkAPi) => {
    try {
      return await categoryService.getCategory(id);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const createCategories = createAsyncThunk(
  "category/create-categories",
  async (category, thunkAPi) => {
    try {
      return await categoryService.createCategories(category);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const updateACategory = createAsyncThunk(
  "category/update-category",
  async (category, thunkAPi) => {
    try {
      return await categoryService.updateCategory(category);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const deleteACategory = createAsyncThunk(
  "category/delete-category",
  async (id, thunkAPi) => {
    try {
      return await categoryService.deleteCategory(id);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");
const initialState = {
  categories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCategories = action.payload;
      })
      .addCase(createCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateACategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateACategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCategory = action.payload;
      })
      .addCase(updateACategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteACategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteACategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCategory = action.payload;
      })
      .addCase(deleteACategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getACategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getACategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categoryName = action.payload.title;
      })
      .addCase(getACategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default categorySlice.reducer;
