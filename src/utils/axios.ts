import axios from "axios";

export const axiosinstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});
