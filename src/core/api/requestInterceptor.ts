import { AxiosError, AxiosRequestConfig } from "axios";

export const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {

    config.headers = {
        'Content-type': 'application/json',
        ...config.headers,
    };
    return config;
};
export const onRequestError = (error: AxiosError) => Promise.reject(error);
