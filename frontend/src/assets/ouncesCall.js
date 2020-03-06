import React from "react";
let accessString = localStorage.getItem("JWT");
let apiBaseUrl = "http://localhost:3000/";
const axios = require("axios");

export default function getOuncesCall() {
  return axios
    .get(apiBaseUrl + "asset", {
      headers: { Authorization: "Bearer " + accessString },
      validateStatus: function(status) {
        if (status == 500) {
          alert("Server Side Error. Please Contact Support");
        }
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    })

    .then(function(response) {
      let ouncesIn = 0;

      for (let i = 0; i < response.data.length; i++) {
        ouncesIn = ouncesIn + response.data[i].ouncesIn;
      }
      return ouncesIn;
    });
}
