import { useDispatch, useSelector } from 'react-redux';
import { IData } from './../../core/interfaces/interface';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../../core/config/constants';
import { postData } from '../../core/api/functions';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { setlogin, setlogout } from '../../core/store/actions';
import * as actionTypes from '../../core/store/actionTypes';
import { setCookie, deleteCookie, getCookie } from '../../utils/helper';

interface IJwtPayload extends JwtPayload {
  username?: string;
}
const invalidLoginMsg = 'Invalid Credentials';

const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: IData) => state.userData.user);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const authResponse = await postData(apiURL.authSignIn, {
        username: email,
        password,
      });
      if (authResponse) {
        const responseData: { access_token: string; refresh_token: string } =
          authResponse.data;
        const accessToken = responseData.access_token;
        const refreshToken = responseData.refresh_token;
        console.log(accessToken);
        setCookie('accessToken', accessToken);
        setCookie('refreshToken', refreshToken);
        dispatch(setlogin());
        //TODO: Add name
        toast.success('Welcome. You are succesfully logged in.');
      }
      else {
        //TODO: error msg
      }
    } catch (error: any) {
      toast.error('An error occurred during login.', {
        toastId: 'login-error',
      });
    }
  };

  const logout = () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    dispatch(setlogout());
  };

  useEffect(() => {
    const authToken = getCookie('accessToken');
    if (authToken) {
      dispatch(setlogin());
      const decodedToken = jwtDecode(authToken); // jwt-decode npm package
      const currentTime = Math.floor(Date.now() / 1000);

      // Check token expiry
      if (decodedToken && decodedToken.exp! < currentTime) {
        logout();
      }
    }
  }, [dispatch]);

  return {
    user,
    login,
    logout,
  };
};
export default useAuth;
