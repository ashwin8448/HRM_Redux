import { AxiosRequestConfig } from "axios";
import { makeRequest } from ".";
import { IPostEmployee } from "../interfaces/interface";

export const getData =  (url: string, config?: AxiosRequestConfig)=> {
    return makeRequest('get', url, null, config);
};

export const postData = (url: string, payload: object, config?: AxiosRequestConfig) => {
    return makeRequest('post', url, payload, config);
};

export const updateData = (
    url: string,
    payload: Partial<IPostEmployee>,
    config?: AxiosRequestConfig
) => {
    return makeRequest('patch', url, payload, config);
};

export const deleteData =  (url: string, config?: AxiosRequestConfig)=> {
    return makeRequest('delete', url, null, config);
};