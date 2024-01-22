import { ISelectOptionProps } from "../../core/interfaces/interface.ts";
import {
  nameValidation,
  emailValidation,
  phoneValidation,
  addressValidation,
  dateValidation,
  numberValidation,
} from "./constants/validationConfig.ts";

const getEditFormConfig = ({
  departments,
  roles,
  skills,
  required,
}: {
  departments: ISelectOptionProps[];
  skills: ISelectOptionProps[];
  roles: ISelectOptionProps[];
  required: boolean;
}) => [
  {
    sectionName: "Personal Details",
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
        validation: nameValidation,
        label: "Last name",
        type: "text",
        name: "lastName",
        isRequired: required,
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
        validation: phoneValidation,
        label: "Phone number",
        type: "tel",
        name: "phone",
        isRequired: required,
        visibility: "public",
      },
      {
        validation: addressValidation,
        label: "Address",
        type: "textarea",
        name: "address",
        isRequired: required,
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
    ],
  },
  {
    sectionName: "Professional Details",
    sectionActiveState: 2,
    sectionFields: [
      {
        validation: dateValidation,
        label: "Date of joining",
        type: "date",
        name: "dateOfJoining",
        isRequired: true,
        visibility: "public",
      },
      {
        validation: nameValidation,
        label: "Deisgnation",
        type: "text",
        name: "designation",
        isRequired: required,
        visibility: "public",
      },
      {
        validation: numberValidation,
        label: "Salary",
        type: "text",
        name: "salary",
        isRequired: required,
        visibility: "public",
      },
      {
        label: "Currently employed",
        type: "radio",
        options: ["Yes", "No"],
        name: "isActive",
        isRequired: required,
        visibility: "public",
      },
      {
        label: "Provide admin access",
        type: "radio",
        options: ["Yes", "No"],
        name: "isAdmin",
        isRequired: !required,
        visibility: "private",
      },
      {
        label: "Choose department",
        type: "dropdown",
        options: departments,
        name: "department",
        placeholder: "Select department",
        isMulti: false,
        isRequired: required,
        visibility: "public",
      },
      {
        label: "Choose role",
        type: "dropdown",
        options: roles,
        name: "role",
        placeholder: "Select role",
        isMulti: false,
        isRequired: required,
        visibility: "public",
      },
      {
        label: "Choose skills",
        type: "dropdown",
        options: skills,
        name: "skills",
        placeholder: "Select skills",
        isMulti: true,
        isRequired: required,
        visibility: "public",
      },
    ],
  },
  {
    sectionName: "Uploads",
    sectionActiveState: 3,
    sectionFields: [
      {
        label: "Employee Photograph",
        type: "file",
        name: "photoId",
        accept: "image/*",
        isRequired: false,
        visibility: "public",
      },
    ],
  },
];

export default getEditFormConfig;
