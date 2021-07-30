import axios from "axios";

export default axios.create({
  baseURL: "http://areco.gob.ar:9528",
  headers: {
    "Content-type": "application/json"
  }
});