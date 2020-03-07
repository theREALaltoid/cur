import React from "react";
import moment from "moment";
import apiKey from "./apikey.jsx";
const axios = require("axios");
let apiUrl =
  "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=XAG&to_currency=USD&apikey=";
export default function getSpotPrice(apiUrl, apiKey) {
  return axios
    .get(apiUrl + apiKey, {
      validateStatus: function(status) {
        if (status == 500) {
          console.log(payload);
          alert();
        }
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    })

    .then(function(response) {
      let spotPrice = parseFloat(
        response.data["Realtime Currency Exchange Rate"]["9. Ask Price"]
      );
      spotPrice = spotPrice.toFixed(2);
      return spotPrice;
    });
}
