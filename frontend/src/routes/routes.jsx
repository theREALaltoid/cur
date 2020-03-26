import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/home";
import signin from "../pages/signin";
import signup from "../pages/signup";
import dashboard from "../pages/dashboard";
import PrivateRoute from "./privateroute";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/signin" component={signin} />
    <Route path="/signup" component={signup} />
    <PrivateRoute path="/dashboard" component={dashboard} />
  </Switch>
);

export default Routes;
