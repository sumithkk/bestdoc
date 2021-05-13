import {
  START_LOADING,
  END_LOADING,
  FETCH_ALL,
  CREATE,
  ERROR,
} from "../constants/actionTypes";
import * as api from "../api/index.js";
import { showToast } from "./appActions";

// fetch all requests
export const getRequest = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const data = await api.fetchRequests();

    dispatch({
      type: FETCH_ALL,
      payload: data,
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: END_LOADING });
    let res = error.response;
    dispatch({ type: ERROR, payload: res.data.message });
    dispatch(showToast());
  }
};

// Create request
export const createRequest = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createRequest(post);
    // history.push(`/requests/`);

    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: END_LOADING });
    let res = error.response;
    dispatch({ type: ERROR, payload: res.data.message });
    dispatch(showToast());
  }
};
