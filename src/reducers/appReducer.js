import * as actionType from "../constants/actionTypes";

const appReducer = (state = { error: null }, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "END_LOADING":
      return { ...state, isLoading: false };
    case "SHOW_TOAST":
      return { ...state, showToast: true };
    case "HIDE_TOAST":
      return { ...state, showToast: false };
    case actionType.ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default appReducer;
