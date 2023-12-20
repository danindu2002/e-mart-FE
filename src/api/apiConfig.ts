import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8082/api/v1",
});

export default instance;
