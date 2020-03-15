import { modalReducer, dataFetch, dropdownClickedReducer } from "./modal";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  modal: modalReducer,
  dataFetch: dataFetch,
  dropdown: dropdownClickedReducer
});

export default allReducers;
