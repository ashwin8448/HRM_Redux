import { AxiosError, AxiosRequestConfig } from "axios";
import { getToken } from "../../utils/helper";

export const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const authToken = getToken("accessToken");
  const headers = {
    Authorization: authToken
      ? `Bearer ${authToken && JSON.parse(authToken).token}`
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
