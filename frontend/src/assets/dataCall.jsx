import moment from "moment";
import annotation from "chartjs-plugin-annotation";
import Chart from "chart.js";
import { apiBaseUrl } from "../assets/urlAssets";

const axios = require("axios");

export default function(desiredLength, spotPrice, apiBaseUrl) {
  if (window.chart && window.chart !== null) {
    window.chart.destroy();
  }

  //This pulls user asset data from our api

  function getAssetData(apiBaseUrl) {
    return axios
      .get(
        apiBaseUrl + "/asset",
        { withCredentials: true },
        {
          validateStatus: function(status) {
            if (status === 500) {
              alert("Server Side Error. Please Contact Support");
            }
            return status < 500; // Reject only if the status code is greater than or equal to 500
          }
        }
      )
      .then(function(response) {
        return response.data;
      });
  }
  //This pulls historical spot price data from our api

  function getHistoricalSpotPrices(endDate, startDate, apiBaseUrl) {
    return axios
      .get(
        apiBaseUrl + "/api",

        {
          withCredentials: true,
          params: {
            startDate: startDate,
            endDate: endDate
          },
          validateStatus: function(status) {
            return status < 500; // Reject only if the status code is greater than or equal to 500
          }
        }
      )
      .then(console.log(startDate));
  }
  getAssetData(apiBaseUrl)
    .then(response => {
      let assetCost = 0;
      let ouncesIn = [];
      let assetValue = [];
      let neededLabels = [];
      let requestedLabels = [];
      let userData = [];
      // Here is where we will calculate the value of the user's assets and then send that to assetWatcher Template
      spotPrice = parseFloat(spotPrice);
      let desiredDate = moment()
        .subtract(desiredLength, "days")
        .format();

      let sortByDateAsc = function(a, b) {
        if (a.date > b.date) return 1;
        if (a.date < b.date) return -1;
        return 0;
      };
      Array.prototype.insert = function(index, item) {
        this.splice(index, 0, item);
      };
      /*Needed labels is an array of JSON objects where value
      equals 0 and date equals a needed date requested. It acts as a template that
      can be combined with userData */

      /*Here we push ounces in, how much assets cost,
        and a JSON object where date = the date purchased and
        value equals the ouncesIn times current spotPrice */
      /*If the desiredLength is a number greater than -1 that means the user selected
        a timeframe and not all their data. Therefore we need to have a condition on the
        dates selected*/
      for (let i = 0; i < response.length; i++) {
        if (
          (desiredDate <= response[i].purchaseDate && desiredLength > 0) ||
          desiredLength < 0
        ) {
          assetCost = assetCost + response[i].purchasePrice;
          ouncesIn.push(response[i].ouncesIn);
          userData.push({
            date: response[i].purchaseDate,
            value: response[i].ouncesIn
          });
        }
      }

      for (let i = 0; i < userData.length; i++) {
        requestedLabels.push(userData[i].date);
        assetValue.push(userData[i].value);
      }
      userData = [];
      for (let i = requestedLabels.length - 1; i >= 0; i -= 1) {
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

      for (let i = 0; i < requestedLabels.length; i++) {
        userData.push({
          date: requestedLabels[i],
          value: assetValue[i]
        });
      }
      assetValue = [];
      requestedLabels = [];
      console.log(apiBaseUrl);

      if (desiredLength > 0) {
        for (let i = 0; i < desiredLength; i++) {
          neededLabels.push({
            date: moment()
              .subtract(i, "days")
              .format(),
            value: 0
          });
        }
        /* Sort userData array of objects by asscending date
          and then push the respective JSON value to different arrays
           */
        neededLabels.sort(sortByDateAsc);
      } else {
        userData.sort(sortByDateAsc);
        desiredLength = parseInt(
          (new Date(userData[userData.length - 1].date) -
            new Date(userData[0].date)) /
            (1000 * 60 * 60 * 24)
        );
        neededLabels.push({
          date: moment(userData[userData.length - 1].date).format(),
          value: 0
        });
        for (let i = 0; i < desiredLength; i++) {
          neededLabels.push({
            date: moment(userData[0].date)
              .add(i, "days")
              .format(),
            value: 0
          });
        }
        /* Sort userData array of objects by asscending date
    and then push the respective JSON value to different arrays
     */
        neededLabels.sort(sortByDateAsc);
      }
      for (let i = 0; i < userData.length; i++) {
        const index = neededLabels.findIndex(
          e =>
            moment(e.date).format("MM-DD-YYYY") ===
            moment(userData[i].date).format("MM-DD-YYYY")
        );
        if (index > -1) {
          neededLabels[index] = userData[i];
        }
      }

      for (let i = 0; i < neededLabels.length; i++) {
        requestedLabels.push(moment(neededLabels[i].date).format("MM-DD-YYYY"));
        assetValue.push(neededLabels[i].value);
      }
      let endDate = neededLabels[0].date;
      let startDate = neededLabels[requestedLabels.length - 1].date;

      //After user Data is processed(duplicates removed and dates are sorted) we then calculate
      //The value of those assets

      getHistoricalSpotPrices(startDate, endDate, apiBaseUrl).then(res => {
        let totalValueOfAssets = 0;
        for (var i = 0; i < res.data.length; i++) {
          console.log("asset" + totalValueOfAssets);
          console.log(i);
          totalValueOfAssets = totalValueOfAssets + assetValue[i];
          assetValue[i] = assetValue[i] + totalValueOfAssets;
          assetValue[i] = assetValue[i] * res.data[i].spotPrice;
          assetValue[i] = assetValue[i].toFixed(2);
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
                  value: assetCost / 100,
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
        userData = [];
      });
    })

    .catch(function(error) {
      console.log(error);
    });
}
