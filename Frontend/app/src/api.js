import axios from "axios";
export const api = axios.create({
  baseURL: "https://eco-goals-tracker-1.onrender.com/api",
});
