import { FormEvent, useEffect, useState } from "react";
import useAuth from "./useAuth";
import LoginLayoutWrapper from "./login";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button.tsx";
import Loader from "../../components/Loader/Loader.tsx";
import { getCookie } from "../../utils/helper.ts";
import InputWrapper from "../../components/Input/input.ts";
import ButtonGrpWrapper from "../../components/Button/buttonGrpWrapper.ts";
import {
  H3Styles,
  LabelStyles,
  ParagraphStyles,
} from "../../core/constants/components/text/textStyledComponents.ts";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "../../hooks/reduxHooks.ts";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { login, authError, logout, fetchCurrentUser, authLoading } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const authToken = getCookie("accessToken");
    if (authToken) {
      const decodedToken = jwtDecode(authToken); // jwt-decode npm package
      const currentTime = Math.floor(Date.now() / 1000);
      // Check token expiry
      if (decodedToken && decodedToken.exp! < currentTime) {
        logout();
      } else {
        fetchCurrentUser(authToken);
      }
    }
  }, [dispatch]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (username === "") setErrorMsg("Please enter a username.");
    else if (password === "") setErrorMsg("Please enter a password.");
    else {
      login({
        username,
        password,
      });
    }
  }

  return authLoading ? (
    <div className="center-loader">
      <Loader />
    </div>
  ) : (
    <LoginLayoutWrapper>
      <H3Styles>Sign In</H3Styles>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <LabelStyles>Username:</LabelStyles>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <LabelStyles>Password:</LabelStyles>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputWrapper>
        {(errorMsg != "" && (
          <ParagraphStyles className="error">{errorMsg}</ParagraphStyles>
        )) ||
          (authError != "" && (
            <ParagraphStyles className="error">{authError}</ParagraphStyles>
          ))}
        <div className="button-container">
          <Button type={"submit"}>Submit</Button>
        </div>
      </form>
    </LoginLayoutWrapper>
  );
}

export default Login;
