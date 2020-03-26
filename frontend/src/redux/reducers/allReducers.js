import { modalReducer, dataFetch } from "./modal";
import { darkModeStateReducer } from "./darkModeStateReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  modal: modalReducer,

  dark: darkModeStateReducer,
  dataFetch: dataFetch
});

export default allReducers;
