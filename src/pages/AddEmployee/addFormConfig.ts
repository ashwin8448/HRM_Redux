import {
  nameValidation,
  emailValidation,
  dateValidation,
  passwordValidation,
  confirmPasswordValidation,
} from "../EmployeeUpdate/constants/validationConfig";

const addFormConfig = [
  {
    sectionName: "Basic Details",
    sectionActiveState: 1,
    sectionFields: [
      {
        validation: nameValidation,
        label: "First name",
        type: "text",
        name: "firstName",
        isRequired: true,
        visibility: "public",
      },
      {
        validation: emailValidation,
        label: "Email",
        type: "email",
        name: "email",
        isRequired: true,
        visibility: "public",
      },
      {
        validation: dateValidation,
        label: "Date of birth",
        type: "date",
        name: "dob",
        isRequired: true,
        visibility: "public",
      },
      {
        validation: dateValidation,
        label: "Date of joining",
        type: "date",
        name: "dateOfJoining",
        isRequired: true,
        visibility: "public",
      },
      {
        label: "Provide admin access",
        type: "radio",
        options: ["Yes", "No"],
        name: "isAdmin",
        isRequired: true,
        visibility: "public",
      },
    ],
  },
  {
    sectionName: "User Credentials",
    sectionActiveState: 2,
    sectionFields: [
      {
        validation: passwordValidation ,
        label: "Password",
        type: "password",
        name: "password",
        isRequired: true,
        visibility: "public",
      },
      {
        validation: confirmPasswordValidation,
        label: "Confirm Password",
        type: "password",
        name: "confirmPassword",
        isRequired: true,
        visibility: "public",
      },
    ],
  },
];

export default addFormConfig;
