import { Route, Redirect } from "react-router-dom";
import { promiseResponse } from "../pages/withAuth";
import React, { Component } from "react";

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(promiseResponse);
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page

    <Route
      {...rest}
      render={props =>
        promiseResponse ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default PrivateRoute;
