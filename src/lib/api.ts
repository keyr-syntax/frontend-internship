import axios from "axios";

const BASE_URL = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export default BASE_URL;
