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
      let labelsAndAsValObjs = [];
      for (let i = 0; i < response.data.length; i++) {
        labelsAndAsValObjs.push({
          date: response.data[i].purchaseDate,
          value: response.data[i].assetValue / 100,
          ouncesIn: response.data[i].ouncesIn
        });
      }
      return labelsAndAsValObjs;
    });
}
