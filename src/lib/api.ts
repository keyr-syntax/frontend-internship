import axios from "axios";

const BASE_URL = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL:"https://www.backend-internship-project.keyrunasir.com",
  withCredentials: true,
});

export default BASE_URL;
