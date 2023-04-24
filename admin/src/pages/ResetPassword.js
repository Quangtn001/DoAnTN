import React from "react";
import InputForm from "../components/InputForm";
const ResetPassword = () => {
  return (
    <div className="py-5" style={{ background: "#212A3E", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Reset Password</h3>
        <p className="text-center">Please enter your new password</p>
        <form action="">
          <InputForm type="password" label="New Password" id="password" />
          <InputForm
            type="password"
            label="Confirm Password"
            id="confirm-password"
          />
          <button
            type="submit"
            className="border-0 px-3 py-2 w-100 bg-danger text-white"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
