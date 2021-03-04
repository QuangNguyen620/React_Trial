import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:80/HDP_Portal",
  headers: {
    "Content-type": "application/json",
  },
});
