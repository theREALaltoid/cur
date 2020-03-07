import React from "react";
import moment from "moment";

import Chart from "chart.js";
let accessString = localStorage.getItem("JWT");
const apiBaseUrl = "http://localhost:3000/";
const axios = require("axios");

export default function getHistoricalSpotPrices(endDate, startDate) {
  return axios
    .get(
      "http://localhost:3000/api",

      {
        headers: { Authorization: "Bearer " + accessString },
        params: {
          startDate: startDate,
          endDate: endDate
        },
        validateStatus: function(status) {
          if (status == 500) {
            console.log(payload);
            alert();
          }
          return status < 500; // Reject only if the status code is greater than or equal to 500
        }
      }
    )

    .then(function(response) {
      return response;
    });
}
