import axios from "axios";

const BASE_URL = axios.create({
  // baseURL: "http://localhost:8000",
  baseURL: "https://www.backend-internship-project.keyrunasir.com",
  withCredentials: true,
});

export default BASE_URL;
