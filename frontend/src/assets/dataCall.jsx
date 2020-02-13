import React from "react";
import moment from "moment";

import Chart from "chart.js";
let accessString = localStorage.getItem("JWT");
let apiBaseUrl = "http://localhost:3000/";
const axios = require("axios");
let assetCost = [];
let ouncesIn = 0;
let labels = [];
let requestedLabels = [];
let desiredLength;

export default function(desiredLength, spotPrice) {
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
      // Here is where we will calculate the value of the user's assets and then send that to assetWatcher Template
      console.log(spotPrice);
      let desiredDate = moment()
        .subtract(desiredLength, "days")
        .format();
      let sortByDateAsc = function(lhs, rhs) {
        return lhs > rhs ? 1 : lhs < rhs ? -1 : 0;
      };
      Array.prototype.insert = function(index, item) {
        this.splice(index, 0, item);
      };
      if (desiredLength > 0) {
        for (var i = 0; i < desiredLength; i++) {
          labels.push(
            moment()
              .subtract(i, "days")
              .format("MM-DD")
          );
        }

        for (var i = 0; i < response.data.length; i++) {
          //  console.log(response.data[i].purchaseDate);
          if (desiredDate <= response.data[i].purchaseDate) {
            assetCost.push(response.data[i].purchasePrice);

            requestedLabels.push(
              moment(response.data[i].purchaseDate).format("MM-DD")
            );

            ouncesIn += response.data[i].ouncesIn;
          } else {
            console.log(desiredDate <= response.data[i].purchaseDate);
          }
        }
        for (var i = 0; i < requestedLabels.length; i++) {
          if (labels[i] != requestedLabels[i]) {
            assetCost.insert(i, 0);
            console.log(requestedLabels[i]);
          }
        }
        console.log(assetCost);
        console.log(labels);
        ouncesIn = parseFloat(ouncesIn);
        ouncesIn.toFixed(2);
      } else if (desiredLength == 0) {
        for (var i = 0; i < response.data.length; i++) {
          labels.push(moment(response.data[i].purchaseDate).format("MM-DD"));
        }

        labels.sort(sortByDateAsc);
        labels = [...new Set(labels)];
        for (var i = 0; i < response.data.length; i++) {
          assetCost.push(response.data[i].purchasePrice);
          ouncesIn + response.data[i].ouncesIn;
        }
        ouncesIn = parseFloat(ouncesIn);
        ouncesIn.toFixed(2);
      }

      var ctx = "myChart";
      let myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "# of Votes",
              data: assetCost,
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
    })

    .catch(function(error) {
      console.log(error);
    });
  assetCost = [];
  ouncesIn = 0;
  labels = [];
  requestedLabels = [];
  desiredLength;
}
