import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://192.168.97.34:5454/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
