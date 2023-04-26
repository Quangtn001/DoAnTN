import React, { useEffect } from "react";
import InputForm from "../components/InputForm";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../features/category/categorySlice";
import Dropzone from "react-dropzone";
import { deleteImage, uploadImage } from "../features/upload/uploadSlice";
import { createProducts, resetState } from "../features/products/productSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
  category: Yup.string().required("Category is required"),
  tags: Yup.string().required("Tags is required"),
  quantity: Yup.number().required("Quantity is required"),
});
const AddProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      tags: "",
      quantity: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/product-list");
      }, 3000);
    },
  });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const categoryData = useSelector((state) => state.category.categories);
  const imageData = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct } = newProduct;

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("🦄 Create product successfully!");
    }
    if (isError) {
      toast.error("🦄 Create product failed!");
    }
  }, [isSuccess, isError, isLoading, createdProduct]);

  const image = [];
  imageData.forEach((item) => {
    image.push({
      public_id: item.public_id,
      url: item.url,
    });
  });
  useEffect(() => {
    formik.values.images = image;
  }, [formik.values, image]);

  return (
    <div>
      <h3 className="mb-4">Add Product</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          {formik.touched.title && formik.errors.title ? (
            <div className="text-danger">{formik.errors.title}</div>
          ) : null}
          <InputForm
            type="text"
            label="Enter product title"
            name="title"
            onCh={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-danger">{formik.errors.description}</div>
          ) : null}
          <div className="mb-3">
            <ReactQuill
              theme="snow"
              value={formik.values.description}
              name="description"
              onChange={formik.handleChange("description")}
            />
          </div>
          {formik.touched.price && formik.errors.price ? (
            <div className="text-danger">{formik.errors.price}</div>
          ) : null}
          <InputForm
            type="number"
            name="price"
            label="Enter product price"
            onCh={formik.handleChange("price")}
            onBlr={formik.handleBlur("price")}
            val={formik.values.price}
          />

          {formik.touched.category && formik.errors.category ? (
            <div className="text-danger">{formik.errors.category}</div>
          ) : null}
          <select
            className=" form-select py-3 mb-3"
            style={{ width: "160px" }}
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
          >
            <option value="" className="text-center" disabled>
              Select category
            </option>
            {categoryData.map((item, index) => {
              return (
                <option key={index} value={item.title}>
                  {item.title}
                </option>
              );
            })}
          </select>

          {formik.touched.tags && formik.errors.tags ? (
            <div className="text-danger">{formik.errors.tags}</div>
          ) : null}
          <select
            className=" form-select py-3 mb-3"
            style={{ width: "160px" }}
            name="tags"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags}
          >
            <option value="" className="text-center" disabled>
              Select tags
            </option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>

          {formik.touched.quantity && formik.errors.quantity ? (
            <div className="text-danger">{formik.errors.quantity}</div>
          ) : null}
          <InputForm
            type="number"
            label="Enter product quantity"
            name="quantity"
            onCh={formik.handleChange("quantity")}
            onBlr={formik.handleBlur("quantity")}
            val={formik.values.quantity}
          />
          <Dropzone
            onDrop={(acceptedFiles) => dispatch(uploadImage(acceptedFiles))}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div
                  {...getRootProps()}
                  className="bg-white p-2 rounded cursor-pointer d-flex flex-column align-items-center justify-content-center"
                >
                  <input {...getInputProps()} />
                  <p className="fw-bold text-center ">
                    Drag and drop your attachments
                  </p>
                  <p>Or</p>
                  <p className="p-2 rounded bg-light">Add Attachment</p>
                </div>
              </section>
            )}
          </Dropzone>
          <div className="mt-3 d-flex flex-wrap">
            {imageData?.map((item, index) => {
              return (
                <div
                  className="position-relative col-sm-6 col-md-4 col-lg-3"
                  key={index}
                >
                  <img src={item.url} alt="" className="img-fluid" />
                  <button
                    onClick={() => dispatch(deleteImage(item.public_id))}
                    type="button"
                    className="btn-close position-absolute"
                  ></button>
                </div>
              );
            })}
          </div>

          <button type="submit" className="btn btn-success my-5">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
