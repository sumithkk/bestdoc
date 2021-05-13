import { combineReducers } from "redux";

import requests from "./Requests";
import auth from "./auth";
import app from "./appReducer";

export const reducers = combineReducers({ requests, auth, app });
