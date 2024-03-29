import React from "react";
const InputForm = (props) => {
  const { name, type, label, i_id, i_class, val, onCh, onBlr } = props;
  return (
    <div className="form-group mb-3">
      <input
        type={type}
        className={`form-control ${i_class}`}
        id={i_id}
        placeholder={label}
        name={name}
        value={val}
        onChange={onCh}
        onBlur={onBlr}
      />
    </div>
  );
};

export default InputForm;
