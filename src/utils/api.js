import axios from "axios";
// import "dotenv/config";

// const BASE_URL = 'http://localhost:8080/api/';
const BASE_URL = "https://backend.fractionai.xyz/api/";
// const token = process.env.BOT_SERVER_TOKEN;

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    // Authorization: "Bearer " + token,
  },
});

export const apiGetRequest = async (path) => {
  return API.get(path);
};

export const apiPostRequest = async (path, postData) => {
  const config = {
    headers:
      postData instanceof FormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" },
  };

  return API.post(path, postData, config);
};
