import { FormEvent, useState } from "react";
import useAuth from "../Login/useAuth.ts";
import LoginLayoutWrapper from "../Login/login.ts";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button.tsx";
import Loader from "../../components/Loader/Loader.tsx";
import ButtonGrpWrapper from "../../components/Button/buttonGrpWrapper.ts";
import InputWrapper from "../../components/Input/input.ts";
import {
  H3Styles,
  LabelStyles,
  ParagraphStyles,
} from "../../core/constants/components/text/textStyledComponents.ts";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const { signUp, authLoading } = useAuth();
  const navigate = useNavigate();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (confirmPassword !== e.target.value) {
      setIsPasswordMatch(false);
    } else {
      setIsPasswordMatch(true);
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      setIsPasswordMatch(false);
    } else {
      setIsPasswordMatch(true);
    }
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (username === "") setErrorMsg("Please enter a username.");
    else if (password === "") setErrorMsg("Please enter a password.");
    else if (!isPasswordMatch) setErrorMsg("Passwords not matching");
    else {
      signUp({ username, password });
    }
  }

  return authLoading ? (
    <div className="center-loader">
      <Loader />
    </div>
  ) : (
    <LoginLayoutWrapper>
      <H3Styles>Sign Up</H3Styles>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <LabelStyles>Username:</LabelStyles>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="new-password"
          />
        </InputWrapper>
        <InputWrapper>
          <LabelStyles>Password:</LabelStyles>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="new-password"
          />
        </InputWrapper>
        <InputWrapper>
          <LabelStyles>Re-enter Password:</LabelStyles>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            autoComplete="new-password"
          />
        </InputWrapper>
        {errorMsg !== "" && (
          <ParagraphStyles className="error">{errorMsg}</ParagraphStyles>
        )}
        <ButtonGrpWrapper className="btn-grp">
          <div className="common-flex alternative-msg">
            {" "}
            Already registered ?{" "}
            <Button
              className="login-btn"
              type={"button"}
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign In
            </Button>
          </div>
          <Button type={"submit"}>Submit</Button>
        </ButtonGrpWrapper>
      </form>
    </LoginLayoutWrapper>
  );
}

export default SignUp;
