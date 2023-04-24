import React from "react";
import InputForm from "../components/InputForm";

const AddCategory = () => {
  return (
    <div>
      <h3 className="mb-4">Add Category</h3>
      <div>
        <form action="">
          <InputForm type="text" label="Enter category" />
          <button className="btn btn-success">Add Category</button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
