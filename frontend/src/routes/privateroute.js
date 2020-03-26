import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { apiBaseUrl } from "../assets/urlAssets";

const axios = require("axios");

class PrivateRoute extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      isLoggedIn: false
    };
    // Your axios call here
    axios
      .get(
        apiBaseUrl + "/users/checkJWTtoken",

        { withCredentials: true },
        {
          validateStatus: function(status, response) {
            if (status === 500 || status === 401) {
            }
            return status < 500; // Reject only if the status code is greater than or equal to 500
          }
        }
      )
      //If status is 200 store jwt, else if code is server error alert error
      .then(response => {
        if (response.data.success === true) {
          // For success
          this.setState(() => ({ isLoading: false, isLoggedIn: true }));
        } else {
          // For fail
          this.setState(() => ({ isLoading: false, isLoggedIn: false }));
        }
      });
  }

  render() {
    return this.state.isLoading ? null : this.state.isLoggedIn ? (
      <Route
        path={this.props.path}
        component={this.props.component}
        exact={this.props.exact}
      />
    ) : (
      <Redirect
        to={{ pathname: "/signin", state: { from: this.props.location } }}
      />
    );
  }
}

const MapStateToProps = state => {
  return {
    modal: state.modal,
    asset: state.asset,
    fetch: state.dataFetch
  };
};
export default connect(
  MapStateToProps,
  null,
  null,
  {
    pure: false
  }
)(PrivateRoute);
