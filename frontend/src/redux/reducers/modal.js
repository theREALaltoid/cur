import {
  MODAL_CLICKED,
  POST_ASSET,
  POST_PRODUCTS_PENDING,
  POST_PRODUCTS_SUCCESS,
  POST_PRODUCTS_ERROR,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  ADD_TODO_STARTED,
  DELETE_TODO
} from "../actions/index";
export const modalReducer = (state = false, { type }) => {
  switch (type) {
    case "MODAL_CLICKED":
      return !state;
    default:
      return state;
  }
};
export const postReducer = (state = false, { type }) => (
  state = {
    assetType: "silver",
    assetValue: 0,
    assetCost: 0,
    dataPurchased: ""
  }
) => {
  switch (type) {
    case "POST_ASSET":
      console.log(action.payload);
      return state;
    default:
      return state;
  }
};

const initialState = {
  loading: false,
  todos: [],
  error: null
};

export const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FetchData":
      return { ...state, data: action.data };
    case "ERROR":
      return { ...state, error: action.msg };
    default:
      return state;
  }
};
