import axios from "axios";

// const API = axios.create({ baseURL: 'http://localhost:5000' });
const API = axios.create({
  baseURL: "https://apiconcierge.dev.bestdocapp.in/api/v1",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
    req.headers["content-Type"] = "multipart/form-data";
    // req.headers["Access-Control-Allow-Origin"] = "http://localhost:8000";
  }

  return req;
});

//FETCH ALL REQUESTS
export const fetchRequests = () =>
  API.get(`/requests/all`, {
    "content-type": "multipart/form-data",
    "Access-Control-Allow-Origin": "http://localhost:8000",
  });

//CREATE REQUEST =====
export const createRequest = (newPost) => API.post("/requests", newPost);

//LOGIN
export const signIn = (formData) => API.post("/auth/login", formData);

//Get User Info
export const getUser = () => API.get("/auth/user");
