import { AxiosError, AxiosRequestConfig } from "axios";

export const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const headers = {
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  };

    config.headers = {
        'Content-type': 'application/json',
        ...config.headers,
        ...headers
    };
    return config;
};
export const onRequestError = (error: AxiosError) => Promise.reject(error);



