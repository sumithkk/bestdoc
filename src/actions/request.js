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
    console.log(error);
    dispatch({ type: ERROR, payload: error });
    dispatch(showToast());
    dispatch({ type: END_LOADING });
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
    console.log(error);
    dispatch({ type: ERROR, payload: error });
    dispatch(showToast());
    dispatch({ type: END_LOADING });
  }
};
