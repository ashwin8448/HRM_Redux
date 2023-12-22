import { AxiosError, AxiosRequestConfig } from "axios";
import { getCookie } from "../../utils/helper";

export const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const token = getCookie("accessToken")
  
  const headers = {
    Authorization: `Bearer ${token}`,
  };

    config.headers = {
        'Content-type': 'application/json',
        ...config.headers,
        ...headers
    };
    return config;
};
export const onRequestError = (error: AxiosError) => Promise.reject(error);