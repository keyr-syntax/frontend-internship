import axios from "axios";

const BASE_URL = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export default BASE_URL;
