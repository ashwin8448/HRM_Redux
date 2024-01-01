import { FormEvent, useState } from "react";
import useAuth from "./useAuth";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    login({
      username,
      password,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Login;
