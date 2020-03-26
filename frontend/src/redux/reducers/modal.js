import {
  OPEN_MODAL,
  NEW_ENTRY,
  UPDATE_CLICKED,
  UPDATE_STATE,
  actionTypes
} from "../actions/index";
import moment from "moment";

const initialState = {
  postToUpdate: "",
  assetType: "",
  assetValue: "",
  assetCost: "",
  ouncesIn: "",
  datePurchased: "",
  update: false,
  modal: false
};
export const modalReducer = (state = initialState, { type, data, field }) => {
  switch (type) {
    case UPDATE_CLICKED:
      return {
        postToUpdate: data[0].id,
        assetType: data[1].assetType,
        assetValue: data[2].assetValue,
        assetCost: data[3].assetCost,
        ouncesIn: data[4].totalOunces,
        datePurchased: moment(data[5].purchaseDate).format("YYYY-MM-DD"),
        update: true,
        modal: true
      };
    case NEW_ENTRY:
      return { ...initialState };
    case OPEN_MODAL:
      return {
        assetType: "",
        assetValue: "",
        assetCost: "",
        ouncesIn: "",
        datePurchased: "",
        update: false,
        modal: true
      };
    case UPDATE_STATE:
      return { ...state, [field]: data };
    default:
      return { ...initialState };
  }
};

const getInitialState = () => ({
  ouncesIn: 0,
  data: [],
  error: "",
  isFetching: false
});

export const dataFetch = (state = getInitialState(), { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.FETCH_SUCCESS:
      return {
        ...state,
        ...payload
      };

    default:
      return state;
  }
};
