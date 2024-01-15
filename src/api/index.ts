import axios from "axios";

const API_URL = "http://localhost:3000"; // TODO: 환경변수로 변경

const ApiManager = axios.create({
  baseURL: API_URL,
  responseType: "json",
  withCredentials: true,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

ApiManager.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("_auth");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default ApiManager;
