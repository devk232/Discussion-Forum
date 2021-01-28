import "./App.css";
import React, { Component } from "react";
//import axios from "axios";
import { Route, Switch, Redirect } from "react-router-dom";
import navbar from "./components/navbar";
import Dashboard from "./components/dashboard";
import Jumotron from "./components/common/jumbotron";
import NotFound from "./components/not-found";
import NewPost from "./components/createpost";
import Log from "./components/log";
import Register from "./components/register";

class App extends Component {
  render() {
    return (
      <div>
        <navbar/>
        <Switch>
          <Route path="/users/login" component={Log}/>
          <Route path="/users/register" component={Register}/>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/new-post" component={NewPost} />
          <Route exact path="/" component={Jumotron} />
          <Redirect from="/users" to="/users/login"/>
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

export default App;
