import { modalReducer, todosReducer } from "./modal";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  modal: modalReducer,
  addTodo: todosReducer
});

export default allReducers;
