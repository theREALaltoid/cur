import React, { Component } from "react";
import { Redirect } from "react-router-dom";
const axios = require("axios");

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false
      };
    }

    componentDidMount() {
      let accessString = localStorage.getItem("JWT");
      var apiBaseUrl = "http://localhost:3000/users/";
      axios
        .get(apiBaseUrl + "checkJWTtoken", {
          headers: { Authorization: "Bearer " + accessString },
          validateStatus: function(status) {
            if (status == 500) {
              console.log(payload);
              alert();
            }
            return status < 500; // Reject only if the status code is greater than or equal to 500
          }
        })

        .then(function(response) {
          if (res.status === 200) {
            this.setState({ loading: false });
          } else if (true) {
            //if false alert user
          }
        })
        .catch(function(error) {
          console.error(error);
          this.setState({ loading: false, redirect: true });
        });
    }
    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return <ComponentToProtect {...this.props} />;
    }
  };
}
