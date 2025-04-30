import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://mockupserver.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 3000,
});

export { apiInstance };
