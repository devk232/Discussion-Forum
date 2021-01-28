import React from "react";

const Input = ({ name, label, value, onChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        name={name}
        type="text"
        id={name}
        className="form-control"
      />
      {error && <div className="alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
