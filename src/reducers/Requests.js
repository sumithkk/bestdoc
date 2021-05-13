import { FETCH_ALL, CREATE } from "../constants/actionTypes";

export default (request = { isLoading: false, request: [] }, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...request, isLoading: true };
    case "END_LOADING":
      return { ...request, isLoading: false };
    case FETCH_ALL:
      return {
        ...request,
        request: action.payload.data.requests,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };

    case CREATE:
      return { ...request, request: [...request.request, action.payload] };

    default:
      return { ...request, request };
  }
};
