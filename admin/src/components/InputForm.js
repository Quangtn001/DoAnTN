import React from "react";
const InputForm = (props) => {
  const { type, label, i_id, i_class } = props;
  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        className={`form-control ${i_class}`}
        id={i_id}
        placeholder={label}
      />
      <label for={label}>{label}</label>
    </div>
  );
};

export default InputForm;
