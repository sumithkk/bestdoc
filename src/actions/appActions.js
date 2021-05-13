import { SHOW_TOAST, HIDE_TOAST } from "../constants/actionTypes";

// Show toast
export const showToast = () => (dispatch) => {
  dispatch({ type: SHOW_TOAST });
  setTimeout(() => {
    dispatch({ type: HIDE_TOAST });
  }, 4000);
};
