import axios from "axios";

const internship = localStorage.getItem("internship");

const BASE_URL = axios.create({
  // baseURL: "http://localhost:8000",
  baseURL: "https://www.backend-internship-project.keyrunasir.com",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${internship}`,
  },
});
export default BASE_URL;
