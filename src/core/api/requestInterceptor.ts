import { AxiosError, AxiosRequestConfig } from "axios";

export const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const authToken = localStorage.getItem("authToken");

  const headers = {
    Authorization: authToken
      ? `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
      : null,
  };

  config.headers = {
    "Content-type": "application/json",
    ...config.headers,
    ...headers,
    withCredentials: authToken ? true : false,
  };
  return config;
};
export const onRequestError = (error: AxiosError) => Promise.reject(error);
