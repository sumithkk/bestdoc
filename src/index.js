import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { reducers } from "./reducers";
import App from "./App";
import "./index.css";
import { composeWithDevTools } from "redux-devtools-extension";

const state = window.__PRELOADED_STATE__;
// delete window.__PRELOADED_STATE__;

const store = createStore(
  reducers,
  state,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
