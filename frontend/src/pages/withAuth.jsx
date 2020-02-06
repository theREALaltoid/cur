import React, { Component } from "react";
import { Redirect } from "react-router-dom";
const axios = require("axios");

let accessString = localStorage.getItem("JWT");
let apiBaseUrl = "http://localhost:3000/users/";

if (accessString) {
  const promiseResponse = axios
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
      //  console.log(truth);
      //  console.log(response.data.success);
      promiseResponse = response.data.success;
      return promiseResponse;
    })
    .catch(function(error) {
      console.log(error);
    });
}

export default promiseResponse;
