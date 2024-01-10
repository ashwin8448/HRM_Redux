import { apiURL } from "../../core/config/constants";
import { getData, postData } from "../../core/api/functions";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useState } from "react";
import { setlogin, setlogout } from "../../core/store/actions";
import {
  setCookie,
  deleteCookie,
  convertIGetEmployeeToIAppEmployee,
} from "../../utils/helper";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useLocation, useNavigate } from "react-router-dom";
import { IAccessToken } from "../../core/interfaces/interface";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userData);
  const navigate = useNavigate();
  const location = useLocation();
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(true);

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      setAuthLoading(true);
      const authResponse = await postData(apiURL.authSignIn, {
        username,
        password,
      });
      if (authResponse) {
        const responseData: { access_token: string; refresh_token: string } =
          authResponse.data;
        const accessToken = responseData.access_token;
        const refreshToken = responseData.refresh_token;
        setCookie("accessToken", accessToken);
        setCookie("refreshToken", refreshToken);
        const currentEmployeeId = (jwtDecode(accessToken) as IAccessToken)
          .username;
        const currentEmployee = (
          await getData(apiURL.employee + `/${currentEmployeeId}`)
        ).data.data;
        dispatch(setlogin(convertIGetEmployeeToIAppEmployee(currentEmployee)));
        navigate(location.state ? location.state.from : "/");
        toast.success(
          `Hi ${currentEmployee.firstName}. You have logged in succesfully.`
        );
      } else {
        //TODO: error msg
      }
    } catch (error: any) {
      if (error.message === "Invalid username or password")
        setAuthError(error.message);
      else {
        logout();
        toast.error("An error occurred during login.", {
          toastId: "login-error",
        });
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    dispatch(setlogout());
    navigate("/login", { replace: true });
  };

  const fetchCurrentUser = async (accessToken: string) => {
    setAuthLoading(true);
    try {
      const currentEmployeeId = (jwtDecode(accessToken) as IAccessToken)
        .username;
      const currentEmployee = (
        await getData(apiURL.employee + `/${currentEmployeeId}`)
      ).data.data;
      dispatch(setlogin(convertIGetEmployeeToIAppEmployee(currentEmployee)));
      navigate(location.state ? location.state.from : '/');
    } catch (error) {
      logout();
      console.error(error);
      toast.error('An error occurred during sign in.', {
        toastId: 'fetch-user-data-error',
      });
    } finally {
      setAuthLoading(false);
    }
  };

  return {
    user,
    login,
    logout,
    authError,
    setAuthError,
    authLoading,
    fetchCurrentUser,
    setAuthLoading,
  };
};
export default useAuth;
