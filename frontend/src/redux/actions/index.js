import { apiBaseUrl } from "../../assets/urlAssets";

const axios = require("axios");

export const NEW_ENTRY = "NEW_ENTRY";
export const OPEN_MODAL = "OPEN_MODAL";
export const openModal = { type: "OPEN_MODAL" };
export const UPDATE_CLICKED = "UPDATE_CLICKED";
export const updateAssetEntry = data => {
  return {
    type: "UPDATE_CLICKED",
    data // it will add key `dataToUpdate` with argument value.
  };
};
export const UPDATE_STATE = "UPDATE_STATE";
export const updateStateOfModal = (data, field) => {
  return {
    type: "UPDATE_STATE",
    data,
    field
  };
};
export const inputNewEntry = { type: "NEW_ENTRY" };
export const changeDarkModeState = {
  type: "CHANGE_MODE"
};
export const DROPDOWN_CLICKED = "DROPDOWN_CLICKED";
export const dropdownClickedAction = { type: "DROPDOWN_CLICKED" };

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
        withCredentials: true,

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
