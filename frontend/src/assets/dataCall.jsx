import React from "react";
import moment from "moment";

import Chart from "chart.js";

let accessString = localStorage.getItem("JWT");
let apiBaseUrl = "http://localhost:3000/";
const axios = require("axios");
let assetValue = [];
let labels = [];
let desiredLength;

export default function(desiredLength) {
  axios
    .get(apiBaseUrl + "asset", {
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

      for (var i = 0; i < desiredLength; i++) {
        labels.push(
          moment()
            .subtract(i, "days")
            .format("MM-DD")
        );
      }

      for (var i = 0; i < response.data.length; i++) {
        assetValue.push(response.data[i].purchasePrice);
      }

      var ctx = "myChart";
      let myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "# of Votes",
              data: assetValue,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
      assetValue = [];
      labels = [];
    })

    .catch(function(error) {
      console.log(error);
    });
}
