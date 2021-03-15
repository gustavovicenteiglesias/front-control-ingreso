import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:9525/api/home",
  headers: {
    "Content-type": "application/json"
  }
});