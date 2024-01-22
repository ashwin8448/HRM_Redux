import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { onRequest, onRequestError } from './requestInterceptor';
import { onResponse, onResponseError } from './responseInterceptor';
import { apiConfig } from './api.config';


export const API = axios.create(apiConfig);

API.interceptors.request.use(onRequest as unknown as (
    (value: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>), 
    onRequestError);
API.interceptors.response.use(onResponse as unknown as (
    value: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>, 
    onResponseError);

export const makeRequest = (
    method: string,
    url: string,
    payload?: any,
    config?: AxiosRequestConfig
)=> {
    return API.request({
        method,
        url,
        data: payload,
        ...config,
    });
};
