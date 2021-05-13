import {
  AUTH,
  GET_USER,
  ERROR,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";
import * as api from "../api/index.js";
import { showToast } from "./appActions";

export const signin = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    if (data) {
      const { data } = await api.getUser();
      dispatch({ type: GET_USER, data: data });
    }
    dispatch({ type: END_LOADING });
    router.push("/landing");
  } catch (error) {
    dispatch({ type: END_LOADING });
    let msg = "";
    if (error.response) {
      msg = error.response.data.message;
    } else {
      msg = error.message;
    }
    dispatch({ type: ERROR, payload: msg });
    dispatch(showToast());
  }
};
