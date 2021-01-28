import React, { Component } from "react";
import Input from "./common/input";
import Form from "./common/form";
import Joi from "joi-browser";

class Register extends Form {
  state = {
    data: { username: "", email: "", password: "", password2: "", name: "" },
    errors: { username: "", email: "", password: "", password2: "", name: "" },
  };
  schema = {
    name: Joi.string().required().label("Full Name"),
    username: Joi.string().required().label("Username"),
    email: Joi.string().required().label("Email ID"),
    password: Joi.string().required().label("Password"),
    password2: Joi.string().required().label("Confirm Password"),
  };
  doSubmit = () => {
    // call the server
    console.log("server");
  };
  s;
  render() {
    const { data, errors } = this.state;
    return (
      <div className="container-fluid col-lg-4 col-md-8">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            value={data.name}
            onChange={this.handleChange}
            label="Name"
            name="name"
            error={errors.name}
          />
          <Input
            name="username"
            value={data.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            value={data.email}
            onChange={this.handleChange}
            label="Email ID"
            name="email"
            error={errors.email}
          />
          <Input
            value={data.password}
            onChange={this.handleChange}
            label="Password"
            name="password"
            error={errors.password}
          />
          <Input
            value={data.password2}
            onChange={this.handleChange}
            label="Confirm Password"
            name="password2"
            error={errors.password2}
          />
          <div className="d-grid gap-2"><button className="btn btn-primary" disabled={this.validate()}>
          Register
          </button></div>
        </form>
      </div>
    );
  }
}

export default Register;
