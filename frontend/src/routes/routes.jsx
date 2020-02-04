import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/home";
import signin from "../pages/signin";
import signup from "../pages/signup";
import aboutus from "../pages/aboutus";
import withAuth from "../pages/withAuth";
function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: "/login",
      state: { nextPathname: nextState.location.pathname }
    });
  }
}
const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/signin" component={signin} />
    <Route path="/aboutus" component={withAuth(aboutus)} />
    <Route path="/signup" component={signup} />
  </Switch>
);

export default Routes;
