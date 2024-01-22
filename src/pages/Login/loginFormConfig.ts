import { emailValidation, passwordValidation } from "../EmployeeUpdate/constants/validationConfig";

const loginFormConfig = [
  {
    validation: emailValidation,
    label: "Email address",
    type: "email",
    name: "username",
    isRequired: true,
    visibility: "public",
  },
  {
    validation: passwordValidation ,
    label: "Password",
    type: "password",
    name: "password",
    isRequired: true,
    visibility: "public",
  },
];

export default loginFormConfig;
