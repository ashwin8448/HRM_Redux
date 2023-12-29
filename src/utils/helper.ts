import { postData } from '../core/api/functions.ts';
import { apiURL } from '../core/config/constants.ts';
import { IDepartment, IRole, ISkill } from '../core/interfaces/interface.ts';
import { jwtDecode } from 'jwt-decode';

export function transformArrayToOptionsList(
  optionsArray: (ISkill | IDepartment | IRole)[]
) {
  return optionsArray.map((option: ISkill | IDepartment | IRole) => ({
    value: option.id,
    label:
      (option as ISkill)?.skill ||
      (option as IDepartment)?.department ||
      (option as IRole)?.role,
  }));
}

export function concatenateNames(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts: string[] = value?.split(`; ${name}=`) ?? [];
  if (parts && parts.length === 2) return parts?.pop()?.split(';')?.shift();
  return null;
}

export function setCookie(name: string, value: string) {
  const decodedToken = jwtDecode(value); //getting the payload of the token
  const expiration = new Date(0); // Start with Unix epoch

  if (decodedToken && decodedToken.exp) {
    expiration.setUTCSeconds(decodedToken.exp); //set expiration time of cookie with the expiration time of token
  }

  const cookieValue =
    encodeURIComponent(value) +
    (decodedToken.exp ? `; expires=${expiration.toUTCString()}` : ''); //convert expiration time to string

  document.cookie = `${name}=${cookieValue}; path=/`;
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`; //setting expiration time to epoch
}

export const getNewRefreshToken = async () => {
  const refreshToken = getCookie('refreshToken');
  if (refreshToken) {
    try {
      const response = await postData(apiURL.authRenew, {
        refreshToken,
      });
      const responseData: { access_token: string; refresh_token: string } =
        response.data;
      return responseData;
    } catch (err) {
      console.log('try again, couldnt renew refresh token');
      return;
    }
  } else return;
};
