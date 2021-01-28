import React, { Component } from "react";
import {Link} from "react-router-dom"
import "../App.css";
import Input from "../components/common/input";
import Joi from "joi-browser";
import Form from "./common/form";
import Register from './register'

class Log extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {
      username: "",
      passowrd: "",
    },
  };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  doSubmit = () => {
    // call the server
    console.log("server");
  };
  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <div className="container col-lg-3 col-md-6 border rounded mt-3">
          <h1 className="p-3">Login</h1>
          <form onSubmit={this.handleSubmit}>
            <Input
              name="username"
              value={data.username}
              label="Username"
              onChange={this.handleChange}
              error={errors.username}
            />
            <Input
              name="password"
              value={data.password}
              label="Password"
              onChange={this.handleChange}
              error={errors.password}
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
          New User? <Link href="/users/register">Register Here</Link>
        </div>
      </div>
    );
  }
}

export default Log;
