const axios = require("axios");

export default function getSpotPrice(dailySpotPriceURL, apiKey) {
  return axios
    .get(dailySpotPriceURL + apiKey, {
      validateStatus: function(status) {
        if (status === 500) {
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
