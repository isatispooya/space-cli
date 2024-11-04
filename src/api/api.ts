import axios from "axios";
import { server } from "./server";

const api = axios.create({
  baseURL: server,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
});

export default api;
