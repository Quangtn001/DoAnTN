import React, { useEffect } from "react";
import InputForm from "../components/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  createCategories,
  getACategory,
  resetState,
  updateACategory,
} from "../features/category/categorySlice";
let schema = Yup.object().shape({
  title: Yup.string().required("Category name is required"),
});

const AddCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const getCatId = location.pathname.split("/")[3];
  const newCategory = useSelector((state) => state.category);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCategories,
    updatedCategory,
    categoryName,
  } = newCategory;

  useEffect(() => {
    if (getCatId !== undefined) {
      dispatch(getACategory(getCatId));
    } else {
      dispatch(resetState());
    }
  }, [getCatId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdCategories) {
      toast.success("🦄 Create category successfully!");
    }
    if (isSuccess && updatedCategory) {
      toast.success("🦄 Update category successfully!");
      navigate("/admin/category-list");
    }
    if (isError) {
      toast.error("🦄 Create category failed!");
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdCategories,
    updatedCategory,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (getCatId !== undefined) {
        const data = { id: getCatId, categoryData: values };
        await dispatch(updateACategory(data));
        dispatch(resetState());
      } else {
        await dispatch(createCategories(values));
        formik.resetForm();
        await dispatch(resetState());
        navigate("/admin/category-list");
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4">
        {getCatId !== undefined ? "Edit" : "Add"} Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          {formik.touched.title && formik.errors.title ? (
            <div className="text-danger">{formik.errors.title}</div>
          ) : null}
          <InputForm
            type="text"
            label=" Enter category"
            name="title"
            onCh={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <button type="submit" className="btn btn-success">
            {getCatId !== undefined ? "Edit" : "Add"} Category
          </button>
          {getCatId !== undefined ? (
            <>
              <Link to="/admin/category-list" className="btn btn-danger ms-3">
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

export default AddCategory;
