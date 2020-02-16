import React from "react";
import moment from "moment";

import Chart from "chart.js";
let accessString = localStorage.getItem("JWT");
let apiBaseUrl = "http://localhost:3000/";
const axios = require("axios");
let assetCost = [];
let ouncesIn = [];
let assetValue = [];
let neededLabels = [];
let labels = [];
let requestedLabels = [];
let desiredLength;
let labelsAndAsValObjs = [];
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
      spotPrice = parseFloat(spotPrice);
      let desiredDate = moment()
        .subtract(desiredLength, "days")
        .format();
      let sortByDateAsc = function(a, b) {
        var dateA = new Date(a.date);
        var dateB = new Date(b.date);
        return dateA - dateB;
      };
      Array.prototype.insert = function(index, item) {
        this.splice(index, 0, item);
      };
      if (desiredLength > 0) {
        for (var i = 0; i < desiredLength; i++) {
          neededLabels.push({
            date: moment()
              .subtract(i, "days")
              .format("MM-DD"),
            value: 0
          });
        }

        for (var i = 0; i < response.data.length; i++) {
          if (desiredDate <= response.data[i].purchaseDate) {
            assetCost.push(response.data[i].purchasePrice);

            ouncesIn.push(response.data[i].ouncesIn);
            labelsAndAsValObjs.push({
              date: response.data[i].purchaseDate,
              value: response.data[i].ouncesIn * spotPrice
            });
          }
        }
        labelsAndAsValObjs.sort(sortByDateAsc);
        for (var i = 0; i < labelsAndAsValObjs.length; i++) {
          requestedLabels.push(
            moment(labelsAndAsValObjs[i].date)
              .format("MM-DD")
              .toString()
          );
          assetValue.push(labelsAndAsValObjs[i].value);
        }
        labelsAndAsValObjs = [];
        for (let i = requestedLabels.length - 1; i >= 0; i -= 1) {
          let n = requestedLabels.lastIndexOf(requestedLabels[i]);
          ///    console.log(labels);
          if (
            requestedLabels.indexOf(requestedLabels[i]) !==
            requestedLabels.lastIndexOf(requestedLabels[i])
          ) {
            // We have to put the actaul .indexOf function instead of defining a const
            // because .indexOf returns an array
            assetValue[requestedLabels.lastIndexOf(requestedLabels[i])] =
              assetValue[requestedLabels.indexOf(requestedLabels[i])] +
              assetValue[requestedLabels.lastIndexOf(requestedLabels[i])];
            assetValue.splice(requestedLabels.indexOf(requestedLabels[i]), 1);
            console.log(spotPrice);

            requestedLabels.splice(
              requestedLabels.indexOf(requestedLabels[i]),
              1
            );
          }
        }
        for (var i = 0; i < requestedLabels.length; i++) {
          labelsAndAsValObjs.push({
            date: requestedLabels[i],
            value: assetValue[i]
          });
        }
        assetValue = [];
        console.log(labelsAndAsValObjs);
        for (var i = 0; i < labelsAndAsValObjs.length; i++) {
          const index = neededLabels.findIndex(
            e => e.date === labelsAndAsValObjs[i].date
          );
          if (index === -1) {
          } else {
            neededLabels[index] = labelsAndAsValObjs[i];
          }
        }
        for (var i = 0; i < neededLabels.length; i++) {
          labels.push(neededLabels[i].date);
          assetValue.push(neededLabels[i].value);
        }
        console.log(labels);
      } else if (desiredLength == 0) {
        for (var i = 0; i < response.data.length; i++) {
          labelsAndAsValObjs.push({
            date: response.data[i].purchaseDate,
            value: response.data[i].ouncesIn * spotPrice
          });
          assetCost.push(response.data[i].purchasePrice);
          ouncesIn.push(response.data[i].ouncesIn);
        }
        let uniqueLabels = [];

        labelsAndAsValObjs.sort(sortByDateAsc);
        for (var i = 0; i < labelsAndAsValObjs.length; i++) {
          labels.push(
            moment(labelsAndAsValObjs[i].date)
              .format("MM-DD")
              .toString()
          );
          assetValue.push(labelsAndAsValObjs[i].value);
        }

        let k = 0;
        for (let i = labels.length - 1; i >= 0; i -= 1) {
          let n = labels.lastIndexOf(labels[i]);
          ///    console.log(labels);
          if (labels.indexOf(labels[i]) !== labels.lastIndexOf(labels[i])) {
            // We have to put the actaul .indexOf function instead of defining a const
            // because .indexOf returns an array
            assetValue[labels.lastIndexOf(labels[i])] =
              assetValue[labels.indexOf(labels[i])] +
              assetValue[labels.lastIndexOf(labels[i])];
            assetValue.splice(labels.indexOf(labels[i]), 1);
            console.log(spotPrice);

            labels.splice(labels.indexOf(labels[i]), 1);
          }

          ///console.log(labels.length);
          k++;
        }
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
    })

    .catch(function(error) {
      console.log(error);
    });
  assetCost = [];
  ouncesIn = [];
  assetValue = [];
  labels = [];
  requestedLabels = [];
  desiredLength;
  labelsAndAsValObjs = [];
  neededLabels = [];
}
