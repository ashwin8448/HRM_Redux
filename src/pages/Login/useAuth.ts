import { apiURL } from "../../core/config/constants";
import { getData, postData } from "../../core/api/functions";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useState } from "react";
import { setLogin, setLogout } from "../../core/store/actions";
import {
  setCookie,
  deleteCookie,
  convertIGetEmployeeToIAppEmployee,
} from "../../utils/helper";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { useLocation, useNavigate } from "react-router-dom";
import { IAccessToken } from "../../core/interfaces/interface";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

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
        const currentEmployeeResponse = (
          await getData(apiURL.employee + `/${currentEmployeeId}`)
        ).data.data;
        const { id, isNew, accessControlRole, firstName, photoId } =
          convertIGetEmployeeToIAppEmployee(currentEmployeeResponse);
        const currentEmployeeData = {
          id,
          isNew,
          accessControlRole,
          firstName,
          photoId,
        };
        localStorage.setItem(
          "userDetails",
          JSON.stringify(currentEmployeeData)
        );
        dispatch(setLogin(currentEmployeeData));
        dispatch(
          setLogin(convertIGetEmployeeToIAppEmployee(currentEmployeeResponse))
        );
        navigate(location.state ? location.state.from : "/");
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
    localStorage.removeItem("userDetails")
    dispatch(setLogout());
    navigate("/login", { replace: true });
  };

  return {
    login,
    logout,
    authError,
    setAuthError,
    authLoading,
    setAuthLoading,
  };
};
export default useAuth;
