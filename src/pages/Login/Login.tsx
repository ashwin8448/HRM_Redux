import useAuth from "./useAuth";
import LoginLayoutWrapper from "./login";
import Loader from "../../components/Loader/Loader.tsx";
import {
  H3Styles,
  ParagraphStyles,
} from "../../core/constants/components/text/textStyledComponents.ts";
import loginFormConfig from "./loginFormConfig.ts";
import { IInputProps } from "../../core/interfaces/interface.ts";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../../components/Input/Input.tsx";

const Login = () => {
  const methods = useForm({
    mode: "onChange",
  });
  const { login, authError, authLoading } = useAuth();

  const onSubmit = methods.handleSubmit(() => {
    const formValues = methods.getValues();
    login({ username: formValues.username, password: formValues.password });
  });

  return authLoading ? (
    <div className="center-loader">
      <Loader />
    </div>
  ) : (
    <LoginLayoutWrapper>
      <H3Styles>Sign In</H3Styles>
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          noValidate
        >
          {loginFormConfig.map((formField: IInputProps) => (
            <Input key={formField.name} config={formField} />
          ))}
          {authError != "" && (
            <ParagraphStyles className="error">{authError}</ParagraphStyles>
          )}
          <div className="button-container">
            <input className="primary-btn" type="submit" value="Submit" />
          </div>
        </form>
      </FormProvider>
    </LoginLayoutWrapper>
  );
};

export default Login;
