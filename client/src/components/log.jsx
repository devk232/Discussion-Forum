import React from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import { ToastContainer, toast } from "react-toastify";
import "../App.css";
import Input from "../components/common/input";
import Form from "./common/form";
import { login } from "../services/authService";
import {getCurrentUser} from "../services/authService";

class Log extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };
  currentUser;
  doSubmit = async () => {
    try {
      const { data } = this.state;
      await login(data.email, data.password); // Login function now handles storing session
      this.currentUser = await getCurrentUser(data.email)
      console.log("current user is: ", this.currentUser)
      document.cookie = `userEmail=${data.email}; path=/`; // Set session cookie with user email
      document.cookie = `userRole=${this.currentUser.role}; path=/`; // Set session cookie with user email

      window.location.href = "/dashboard"; // Redirect to dashboard after successful login
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("Invalid Email or Password");
      }
    }
  };

  render() {
    return (
      <div>
        <div className="container col-lg-3 col-md-6 border rounded mt-3">
          <h1 className="p-3">Login</h1>

          <form onSubmit={this.handleSubmit}>
            <Input
              name="email"
              label="Email"
              type="email"
              onChange={this.handleChange}
              error={this.state.errors.email}
            />
            <Input
              name="password"
              label="Password"
              type="password"
              onChange={this.handleChange}
              error={this.state.errors.password}
            />
            <div className="text-center">
              <button
                className="btn btn-primary m-3"
                disabled={this.validate()}
              >
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="container col-lg-3 col-md-6 border rounder mt-1 p-3 text-center">
          New User? <Link to="/users/register">Register Here</Link>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default Log;
