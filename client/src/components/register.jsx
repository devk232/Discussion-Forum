import React from "react";
import Input from "./common/input";
import Form from "./common/form";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
import * as userService from "../services/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/react-toastify.esm";

class Register extends Form {
  state = {
    data: { username: "", email: "", password: "", password2: "", name: "", role: "", cinNumber: "" },
    errors: {},
    registered: false // Track if the registration is successful
  };

  schema = {
    name: Joi.string().required().label("Full Name"),
    username: Joi.string().required().label("Username"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
    password2: Joi.string().required().label("Confirm Password"),
    role: Joi.string().required().valid("professeur", "ex-etudiant", "etudiant").label("Role"),
    cinNumber: Joi.string().required().length(8).regex(/^\d+$/).label("CIN Number"),
  };

  doSubmit = async () => {
    try {
      // Register the user
      console.log("Submitting registration form...");
      await userService.register(this.state.data);
      // Set registered state to true
      this.setState({ registered: true });
      // Show success message
      toast.success("Registration successful! Please login.");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("User Already Registered");
      }
    }
  };

  render() {
    // If registered state is true, redirect to login page
    if (this.state.registered) {
      return <Redirect to="users/login"/>;
    }
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="container-fluid col-lg-4 col-md-8">
          <h1>Register</h1>
          <form onSubmit={this.handleSubmit}>
            {/* Name */}
            <Input
              value={this.state.data.name}
              onChange={this.handleChange}
              label="Name"
              name="name"
              type="text"
              error={this.state.errors.name}
            />
            {/* Username */}
            <Input
              name="username"
              value={this.state.data.username}
              label="Username"
              type="text"
              onChange={this.handleChange}
              error={this.state.errors.username}
            />
            {/* Email */}
            <Input
              value={this.state.data.email}
              onChange={this.handleChange}
              label="Email ID"
              type="text"
              name="email"
              error={this.state.errors.email}
            />
            {/* Password */}
            <Input
              value={this.state.data.password}
              onChange={this.handleChange}
              label="Password"
              type="password"
              name="password"
              error={this.state.errors.password}
            />
            {/* Confirm Password */}
            <Input
              value={this.state.data.password2}
              onChange={this.handleChange}
              label="Confirm Password"
              name="password2"
              type="password"
              error={this.state.errors.password2}
            />
            {/* Role */}
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role</label>
              <select className="form-select" id="role" name="role" value={this.state.data.role} onChange={this.handleChange}>
                <option value="">Select Role</option>
                <option value="professeur">Professeur</option>
                <option value="ex-etudiant">Ex-Etudiant</option>
                <option value="etudiant">Etudiant</option>
              </select>
              {this.state.errors.role && <div className="text-danger">{this.state.errors.role}</div>}
            </div>
            {/* CIN Number */}
            <Input
              value={this.state.data.cinNumber}
              onChange={this.handleChange}
              label="CIN Number"
              name="cinNumber"
              type="text"
              error={this.state.errors.cinNumber}
            />
            {/* Submit Button */}
            <div className="d-grid gap-2">
              <button className="btn btn-primary" disabled={this.validate()}>
                Register
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
