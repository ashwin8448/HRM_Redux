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
}: {
  departments: ISelectOptionProps[];
  skills: ISelectOptionProps[];
  roles: ISelectOptionProps[];
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
      },
      {
        validation: nameValidation,
        label: "Last name",
        type: "text",
        name: "lastName",
        isRequired: true,
      },
      {
        validation: emailValidation,
        label: "Email",
        type: "email",
        name: "email",
        isRequired: true,
      },
      {
        validation: phoneValidation,
        label: "Phone number",
        type: "tel",
        name: "phone",
        isRequired: true,
      },
      {
        validation: addressValidation,
        label: "Address",
        type: "textarea",
        name: "address",
        isRequired: true,
      },
      {
        validation: dateValidation,
        label: "Date of birth",
        type: "date",
        name: "dob",
        isRequired: true,
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
      },
      {
        validation: nameValidation,
        label: "Deisgnation",
        type: "text",
        name: "designation",
        isRequired: true,
      },
      {
        validation: numberValidation,
        label: "Salary",
        type: "text",
        name: "salary",
        isRequired: true,
      },
      {
        label: "Currently employed",
        type: "radio",
        options: ["Yes", "No"],
        name: "isActive",
        isRequired: true,
      },
      {
        label: "Choose department",
        type: "dropdown",
        options: departments,
        name: "department",
        placeholder: "Select department",
        isMulti: false,
        isRequired: true,
      },
      {
        label: "Choose role",
        type: "dropdown",
        options: roles,
        name: "role",
        placeholder: "Select role",
        isMulti: false,
        isRequired: true,
      },
      {
        label: "Choose skills",
        type: "dropdown",
        options: skills,
        name: "skills",
        placeholder: "Select skills",
        isMulti: true,
        isRequired: true,
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
        isRequired: true,
      },
    ],
  },
];

export default getEditFormConfig;
