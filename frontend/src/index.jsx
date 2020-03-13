import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./pages/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { applyMiddleware, createStore, compose } from "redux";
import allReducers from "../src/redux/reducers/allReducers";
import thunk from "redux-thunk";
const middlewares = [thunk];
export const store = createStore(
  allReducers,
  compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ) // our initialState
);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
