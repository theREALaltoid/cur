const axios = require("axios");
let accessString = localStorage.getItem("JWT");
let apiBaseUrl = "http://localhost:3000/";
export const MODAL_CLICKED = "MODAL_CLICKED";
export const clickedAction = { type: "MODAL_CLICKED" };

export const DROPDOWN_CLICKED = "DROPDOWN_CLICKED";
export const dropdownClickedAction = { type: "DROPDOWN_CLICKED" };

export const getData = dispatch => {
  return dispatch => {
    axios({
      method: "get",
      headers: { Authorization: "Bearer " + accessString },

      url: apiBaseUrl + "asset"
    }).then(json => {
      let ouncesIn = 0;
      for (var i = 0; i < json.length; i++) {
        if (json[i].ouncesIn) {
          ouncesIn = ouncesIn + json[i].ouncesIn;
        }
      }
      dispatch(receivePosts(json, ouncesIn));
    });
  };
};
export const actionTypes = {
  FETCH_REQUEST: "FETCH_ REQUEST",
  FETCH_FAILED: "FETCH_FAILED",
  FETCH_SUCCESS: "FETCH_SUCCESS"
};
const action = (type, payload) => ({ type, payload });
export const actions = {
  fetchData: (payload = {}) => {
    return dispatch => {
      dispatch(action(actionTypes.FETCH_REQUEST, payload));
      return axios({
        method: "get",
        headers: { Authorization: "Bearer " + accessString },

        url: apiBaseUrl + "asset"
      }).then(json => {
        let ouncesIn = 0;
        for (var i = 0; i < json.data.length; i++) {
          if (json.data[i].ouncesIn) {
            ouncesIn = ouncesIn + json.data[i].ouncesIn;
          }
        }
        let data = json.data;
        dispatch(action(actionTypes.FETCH_SUCCESS, { data, ouncesIn }));
      });
    };
  }
};
