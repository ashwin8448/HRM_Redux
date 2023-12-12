import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { onRequest, onRequestError } from './requestInterceptor';
import { onResponse, onResponseError } from './responseInterceptor';


const API = axios.create({
    baseURL: import.meta.env.VITE_DATABASE_URL,
    timeout: 120000,
});

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
