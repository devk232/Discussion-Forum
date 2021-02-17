import React from "react";

const Input = ({ name, label, value, onChange, error, type }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        id={name}
        className="form-control"
      />
      {error && <div className="alert-info p-2 m-12" role="alert">{error}</div>}
    </div>
  );
};

export default Input;
