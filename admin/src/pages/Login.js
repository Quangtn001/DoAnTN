import React from "react";
import InputForm from "../components/InputForm";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="py-5" style={{ background: "#212A3E", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Login</h3>
        <p className="text-center">Login to your accout to continue.</p>
        <form action="">
          <InputForm type="text" label="Email" id="email" />
          <InputForm type="password" label="Password" id="password" />
          <div className="mb-4 text-end">
            <Link to="/forgot-password" className=" text-danger">
              Forgot Password
            </Link>
          </div>
          <Link
            to="/admin"
            type="submit"
            className="border-0 px-3 py-2 w-100 bg-danger text-white text-center text-decoration-none text-uppercase"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
