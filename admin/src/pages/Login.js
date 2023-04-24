import React, { useEffect } from "react";
import InputForm from "../components/InputForm";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let schema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Password is too short - should be 6 chars minimum.")
      .matches(/[a-zA-Z0-9]/, "Password can only contain Latin letters."),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isLoading, isError, isSuccess, navigate]);
  return (
    <div style={{ background: "#212A3E", minHeight: "100vh" }}>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5 p-5">
          <div className="login-wrap p-4 p-md-5">
            <h3 className="text-center text-uppercase fw-bold">Login</h3>
            <p className="text-center">Login to your accout to continue.</p>

            {message.message === "Rejected" ? (
              <>
                <div className="alert alert-danger"> You are not an Admin</div>
              </>
            ) : (
              ""
            )}

            <form
              action=""
              onSubmit={formik.handleSubmit}
              className="login-form"
            >
              <div className="mb-4"></div>
              <InputForm
                type="text"
                name="email"
                label="Email"
                id="email"
                onCh={formik.handleChange("email")}
                val={formik.values.email}
              />

              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}

              <div className="mb-4"></div>
              <InputForm
                type="password"
                name="password"
                label="Password"
                id="password"
                onCh={formik.handleChange("password")}
                val={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger">{formik.errors.password}</div>
              ) : null}
              <div className="mb-4 text-end">
                <Link to="/forgot-password" className=" text-danger">
                  Forgot Password
                </Link>
              </div>
              <button
                type="submit"
                className="border-0 px-3 py-2 w-100 bg-danger text-white text-center text-decoration-none text-uppercase"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
