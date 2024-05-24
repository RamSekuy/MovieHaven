import axios from "axios";

const mainAPI = axios.create({
  baseURL: "http://localhost:7000",
  withCredentials: true,
});

export default mainAPI;
