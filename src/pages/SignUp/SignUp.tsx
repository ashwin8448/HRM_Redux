import { useState } from "react";
import useAuth from "../Login/useAuth.ts";
import LoginWrapper from "./signUp.ts";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button.tsx";
import Loader from "../../components/Loader/Loader.tsx";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { signUp, authLoading } = useAuth();
  const navigate = useNavigate();

  function handleSubmit() {
    if (username === "") setErrorMsg("Please enter a username.");
    else if (password === "") setErrorMsg("Please enter a password.");
    else {
      signUp({ username, password });
    }
  }

  return authLoading ? (
    <Loader />
  ) : (
    <LoginWrapper>
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {errorMsg != "" && <p className="error">{errorMsg}</p>}
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <div className="buttons-container">
            <Button
              type={"button"}
              onClick={() => {
                navigate("/login");
              }}
            >
              Already registered
            </Button>
            <Button type={"button"} onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </LoginWrapper>
  );
}

export default SignUp;
