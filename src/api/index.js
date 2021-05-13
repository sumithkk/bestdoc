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

  // // Add a response interceptor
  // API.interceptors.response.use(
  //   (response) => {
  //     // Any status code that lie within the range of 2xx cause this function to trigger
  //     // Do something with response data
  //     console.log("response =============");
  //     console.log(response);
  //     return response;
  //   },
  //   function (error) {
  //     // Any status codes that falls outside the range of 2xx cause this function to trigger
  //     // Do something with response error
  //     console.log("error =============");
  //     console.log(error);
  //     return Promise.reject(error);
  //   }
  // );

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
