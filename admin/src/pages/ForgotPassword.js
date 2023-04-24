import React from "react";
import InputForm from "../components/InputForm";
const ForgotPassword = () => {
  return (
    <div className="py-5" style={{ background: "#212A3E", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Forgot Password</h3>
        <p className="text-center">
          Please enter your email to get reset password mail.
        </p>
        <form action="">
          <InputForm type="text" label="Email" placeholder="Email" id="email" />

          <button
            type="submit"
            className="border-0 px-3 py-2 w-100 bg-danger text-white"
          >
            Send Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
