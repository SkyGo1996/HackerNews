import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../constant/baseURL";

export const queryClient = new QueryClient();

export const API = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  timeoutErrorMessage: "Times up, please try again",
});

API.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
