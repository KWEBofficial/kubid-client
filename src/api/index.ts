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
  // TODO: 토근 있으면 같이 보내기~
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default ApiManager;
