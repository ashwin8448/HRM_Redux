import { useDispatch, useSelector } from "react-redux";
import { IData } from "./../../core/interfaces/interface";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { apiURL } from "../../core/config/constants";
import { postData } from "../../core/api/functions";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { setlogin, setlogout } from "../../core/store/actions";
import * as actionTypes from "../../core/store/actionTypes";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = cookies.accessToken;
    if (authToken) {
      const decodedToken = jwtDecode(authToken); // jwt-decode npm package
      const currentTime = Math.floor(Date.now() / 1000);

      // Check token expiry
      if (decodedToken && decodedToken.exp! < currentTime) {
        logout();
      }
    } else {
      logout();
      navigate("/login");
    }
  }, [cookies.accessToken, dispatch, navigate]);

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const authResponse = await postData(apiURL.authSignIn, {
        username,
        password,
      });
      if (authResponse.status === 201) {
        const responseData: { access_token: string } = authResponse.data;
        const accessToken = responseData["access_token"];

        dispatch(
          setlogin({
            name: username,
            isAuthenticated: true,
            token: accessToken,
          })
        );
        setCookie("accessToken", accessToken, { path: "/" });
        toast.success("Welcome. You are succesfully logged in.");

        navigate("/");
      } else {
        toast.error("Invalid username or password.", {
          toastId: "invalid-login",
        });
      }
    } catch (error: any) {
      toast.error("An error occurred during login.", {
        toastId: "login-error",
      });
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    removeCookie("accessToken", { path: "/" });
    dispatch(setlogout());
  };

  return {
    loading,
    login,
    logout,
  };
};
export default useAuth;
