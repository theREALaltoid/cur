const axios = require("axios");
const accessString = localStorage.getItem("JWT");

export const MODAL_CLICKED = "MODAL_CLICKED";
export const clickedAction = { type: "MODAL_CLICKED" };

export const FetchData = "FetchData";
export const ERROR = "ERROR";

export const fetchData = () => {
  return dispatch => {
    axios({
      method: "post",
      headers: { Authorization: "Bearer " + accessString },

      url: "http://localhost:3000/asset",
      data: {
        asset: "silver",
        purchaseDate: "2019-01-06T08:00:00.000Z",
        sellDate: "2019-01-03T08:00:00.000Z",
        purchasePrice: 5,
        sellPrice: 5,
        ouncesIn: 1,
        assetValue: 1400
      }
    })
      .then(response => dispatch({ type: "FetchData", data: response }))
      .catch(error => dispatch({ type: "ERROR", msg: error }));
  };
};
