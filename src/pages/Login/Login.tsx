import { useEffect, useState } from "react";
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

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { login, authError, authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie("accessToken")) navigate("/", { replace: true });
  }, []);

  function handleSubmit() {
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

        <ButtonGrpWrapper className="btn-grp">
          <div className="common-flex alternative-msg">
            Not Already registered ?
            <Button
              className="login-btn"
              type={"button"}
              onClick={() => {
                navigate("/sign-up");
              }}
            >
              Create new account
            </Button>
          </div>
          <Button type={"button"} onClick={handleSubmit}>
            Submit
          </Button>
        </ButtonGrpWrapper>
      </form>
    </LoginLayoutWrapper>
  );
}

export default Login;
