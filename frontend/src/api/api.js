import axios from "axios"

const backendUrl = process.env.REACT_ENV;

if (backendUrl === "production") {
  axios.defaults.baseURL = "";
} else {
  axios.defaults.baseURL = "http://localhost:5000";
}


