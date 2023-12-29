import { FormEvent } from "react";
import useAuth from "../../hooks/useAuth";

const SignIn = () => {
  const { login } = useAuth();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userCredentials = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };
    login(userCredentials);
  };

  return (
    <>
      <div>SignIn</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user-name">Username: </label>
          <input id="user-name" type="text" name="user-name" />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input id="password" type="password" name="password" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SignIn;
