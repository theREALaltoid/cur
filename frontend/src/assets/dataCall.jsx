import React from "react";
import moment from "moment";
import annotation from "chartjs-plugin-annotation";
import Chart from "chart.js";
let accessString = localStorage.getItem("JWT");
let apiBaseUrl = "http://localhost:3000/";
const axios = require("axios");

export default function(desiredLength, spotPrice) {
  if (window.chart && window.chart !== null) {
    window.chart.destroy();
  }
  axios
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
      let assetCost = 0;
      let ouncesIn = [];
      let assetValue = [];
      let neededLabels = [];
      let requestedLabels = [];
      let labelsAndAsValObjs = [];
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
      /*Needed labels is an array of JSON objects where value
      equals 0 and date equals a needed date requested  */
      console.log(desiredLength);
      if (desiredLength > 0) {
        for (let i = 0; i < desiredLength; i++) {
          neededLabels.push({
            date: moment()
              .subtract(i, "days")
              .format("MM-DD"),
            value: 0
          });
        }
        /*Here we push ounces in, how much assets cost,
        and a JSON object where date = the date purchased and
        value equals the ouncesIn times current spotPrice */
        alert("clicked");
        for (i = 0; i < response.data.length; i++) {
          if (desiredDate <= response.data[i].purchaseDate) {
            assetCost = assetCost + response.data[i].purchasePrice;
            ouncesIn.push(response.data[i].ouncesIn);
            labelsAndAsValObjs.push({
              date: response.data[i].purchaseDate,
              value: response.data[i].ouncesIn * spotPrice
            });
          }
        }
        /* Sort labelsAndAsValObjs array of objects by asscending date
        and then push the respective JSON value to different arrays
         */
        labelsAndAsValObjs.sort(sortByDateAsc);
        for (i = 0; i < labelsAndAsValObjs.length; i++) {
          requestedLabels.push(
            moment(labelsAndAsValObjs[i].date)
              .format("MM-DD")
              .toString()
          );
          assetValue.push(labelsAndAsValObjs[i].value);
        }
        labelsAndAsValObjs = [];
        for (i = requestedLabels.length - 1; i >= 0; i -= 1) {
          let n = requestedLabels.lastIndexOf(requestedLabels[i]);
          if (
            requestedLabels.indexOf(requestedLabels[i]) !==
            requestedLabels.lastIndexOf(requestedLabels[i])
          ) {
            // We have to put the actual .indexOf function instead of defining a const
            // because .indexOf returns an array
            assetValue[requestedLabels.lastIndexOf(requestedLabels[i])] =
              assetValue[requestedLabels.indexOf(requestedLabels[i])] +
              assetValue[requestedLabels.lastIndexOf(requestedLabels[i])];
            assetValue.splice(requestedLabels.indexOf(requestedLabels[i]), 1);
            requestedLabels.splice(
              requestedLabels.indexOf(requestedLabels[i]),
              1
            );
          }
        }
        for (i = 0; i < requestedLabels.length; i++) {
          labelsAndAsValObjs.push({
            date: requestedLabels[i],
            value: assetValue[i]
          });
        }
        assetValue = [];
        requestedLabels = [];
        for (i = 0; i < labelsAndAsValObjs.length; i++) {
          const index = neededLabels.findIndex(
            e => e.date === labelsAndAsValObjs[i].date
          );
          if (index > -1) {
            neededLabels[index] = labelsAndAsValObjs[i];
          }
        }
        for (i = 0; i < neededLabels.length; i++) {
          requestedLabels.push(neededLabels[i].date);
          assetValue.push(neededLabels[i].value);
        }
      }
      //If desiredDate is 0 that means the user requested ALL available data
      else {
        for (var i = 0; i < response.data.length; i++) {
          labelsAndAsValObjs.push({
            date: response.data[i].purchaseDate,
            value: response.data[i].ouncesIn * spotPrice
          });
          assetCost = assetCost + response.data[i].purchasePrice;
          ouncesIn.push(response.data[i].ouncesIn);
        }

        labelsAndAsValObjs.sort(sortByDateAsc);
        for (i = 0; i < labelsAndAsValObjs.length; i++) {
          requestedLabels.push(
            moment(labelsAndAsValObjs[i].date)
              .format("MM-DD")
              .toString()
          );
          assetValue.push(labelsAndAsValObjs[i].value);
        }

        for (i = requestedLabels.length - 1; i >= 0; i -= 1) {
          let n = requestedLabels.lastIndexOf(requestedLabels[i]);

          if (
            requestedLabels.indexOf(requestedLabels[i]) !==
            requestedLabels.lastIndexOf(requestedLabels[i])
          ) {
            // We have to put the actual .indexOf function instead of defining a const
            // because .indexOf returns an array
            assetValue[requestedLabels.lastIndexOf(requestedLabels[i])] =
              assetValue[requestedLabels.indexOf(requestedLabels[i])] +
              assetValue[requestedLabels.lastIndexOf(requestedLabels[i])];
            assetValue.splice(requestedLabels.indexOf(requestedLabels[i]), 1);

            requestedLabels.splice(
              requestedLabels.indexOf(requestedLabels[i]),
              1
            );
          }
        }
      }
      var ctx = document.getElementById("myChart").getContext("2d");
      window.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: requestedLabels,
          datasets: [
            {
              label: "Asset Value",
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
          },
          annotation: {
            annotations: [
              {
                type: "line",
                mode: "horizontal",
                scaleID: "y-axis-0",
                value: assetCost,
                borderColor: "rgb(75, 192, 192)",
                borderWidth: 1
              }
            ]
          }
        }
      });
      assetCost = 0;
      ouncesIn = [];
      assetValue = [];
      neededLabels = [];
      requestedLabels = [];
      labelsAndAsValObjs = [];
    })

    .catch(function(error) {
      console.log(error);
    });
}
