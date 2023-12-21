import { AxiosError, AxiosResponse } from "axios";

export enum HTTP_STATUS {
  SUCCESS = 200,
  INFORMATION=300,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  SERVER_ERROR = 500,
  UNAUTHORIZED = 401,
}

interface ErrorResponse {
  status: number;
  message: string;
}

export function onResponseError(error: AxiosError): Promise<any> {

  if (
    (error.response?.status === HTTP_STATUS.SERVER_ERROR ||
      error.response?.status === HTTP_STATUS.UNAUTHORIZED ||
      error.response?.status === HTTP_STATUS.FORBIDDEN ||
      error.response?.status === HTTP_STATUS.NOT_FOUND ||
      error.response?.status === HTTP_STATUS.BAD_REQUEST) &&
    window.location.pathname !== "/error"
  ) {
    window.location.href = `/error?statusCode=${error.response?.status}`;
    return Promise.reject(error.response.data as ErrorResponse);
  }
  return Promise.reject(error.response);
}

export function onResponse(response: AxiosResponse): Promise<AxiosResponse> {
  if (
    response.status >= HTTP_STATUS.SUCCESS &&
    response.status <= HTTP_STATUS.INFORMATION
  ) {
    return Promise.resolve(response);
  }
  return Promise.reject(response);
}
