import {
  MODAL_CLICKED,
  POST_ASSET,
  DROPDOWN_CLICKED,
  SAVE_DATA,
  actionTypes
} from "../actions/index";

export const modalReducer = (state = false, { type }) => {
  switch (type) {
    case "MODAL_CLICKED":
      return !state;
    default:
      return state;
  }
};

const initialDropdown = [{ open: false, selected: "silver" }];
export const dropdownClickedReducer = (state = initialDropdown, { type }) => {
  switch (type) {
    case "DROPDOWN_CLICKED":
      console.log(initialDropdown);
      return !initialDropdown.open;
    default:
      return !state;
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

const fetchReducer = (
  state = {
    isFetching: false,
    didInvalidate: false,
    ouncesIn: 0,
    labelsAndAsValObjs: []
  },
  { type }
) => {
  switch (action.type) {
    case SAVE_DATA:
      return {
        ouncesIn: action.ouncesIn,
        labelsAndAsValObjs: action.labelsAndAsValObjs
      };
    default:
      return state;
  }
};
