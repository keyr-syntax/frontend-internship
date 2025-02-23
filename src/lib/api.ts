import axios from "axios";

const BASE_URL = axios.create({
  // baseURL: "http://localhost:8000",
  baseURL: "https://intern-project-backend-43ao.vercel.app",
  withCredentials: true,
});

export default BASE_URL;
