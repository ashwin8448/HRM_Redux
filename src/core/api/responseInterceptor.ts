import { AxiosError, AxiosResponse } from "axios";
import {
  deleteCookie,
  getNewRefreshToken,
  setCookie,
} from "../../utils/helper";
import { API } from ".";
import { apiURL } from "../config/constants";

export enum HTTP_STATUS {
  SUCCESS = 200,
  INFORMATION = 300,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  SERVER_ERROR = 500,
  UNAUTHORIZED = 401,
}

interface IErrorResponse {
  status: number;
  message: string;
}

export async function onResponseError(error: AxiosError): Promise<AxiosError> {
  const { config } = error;
  if (
    (error.response?.status === HTTP_STATUS.SERVER_ERROR ||
      error.response?.status === HTTP_STATUS.FORBIDDEN ||
      error.response?.status === HTTP_STATUS.NOT_FOUND ||
      error.response?.status === HTTP_STATUS.BAD_REQUEST) &&
    window.location.pathname !== "/error"
  ) {
    // window.location.href = `/error?statusCode=${error.response?.status}`;
    return Promise.reject(error.response.data as IErrorResponse);
  } else if (
    error.response?.status === HTTP_STATUS.UNAUTHORIZED &&
    window.location.pathname !== "/error" &&
    config!.url != apiURL.authRenew
  ) {
    if (config!.url === apiURL.authSignIn) {
      return Promise.reject(error.response.data as IErrorResponse);
    } else {
      const refreshResponse = await getNewRefreshToken();
      if (refreshResponse) {
        setCookie("accessToken", refreshResponse.access_token);
        setCookie("refreshToken", refreshResponse.refresh_token);
        return API(config!);
      } else {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        localStorage.removeItem("userDetails");
        window.location.href = `/login`;
        return Promise.reject(error.response.data as IErrorResponse);
      }
    }
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
