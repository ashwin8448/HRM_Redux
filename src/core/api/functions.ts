import { AxiosRequestConfig } from "axios";
import { makeRequest } from ".";

export const getData =  (url: string, config?: AxiosRequestConfig)=> {
    return makeRequest('get', url, null, config);
};

export const postData = (url: string, payload: object, config?: AxiosRequestConfig) => {
    return makeRequest('post', url, payload, config);
};

export const updateData = (
    url: string,
    payload: any,
    config?: AxiosRequestConfig
) => {
    return makeRequest('put', url, payload, config);
};

export const deleteData =  (url: string, config?: AxiosRequestConfig)=> {
    return makeRequest('delete', url, null, config);
};