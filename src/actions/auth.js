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
    console.log(error);
    dispatch({ type: ERROR, payload: error });
    dispatch(showToast());
    dispatch({ type: END_LOADING });
  }
};
