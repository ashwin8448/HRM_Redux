import {
  FieldValues,
  UseFormSetValue,
  UseFormGetValues
} from "react-hook-form";
import {
  IAppEmployee,
  IDepartment,
  IGetEmployee,
  IPostEmployee,
  IRole,
  ISelectOptionProps,
  ISkill,
  ITableProps,
} from "../core/interfaces/interface.ts";
import { uploadImage } from "./firebase.ts";

export function transformArrayToOptionsList(
  optionsArray: (ISkill | IDepartment | IRole)[]
) {
  return optionsArray.map((option: ISkill | IDepartment | IRole) => ({
    value: option.id,
    label:
      (option as ISkill)?.skill ||
      (option as IDepartment)?.department ||
      (option as IRole)?.role,
  }));
}

export function resetFiltersAndSearchBar() {
  const resettedValues = {
    department: null,
    role: null,
    skills: null,
    search_term: "",
  };
  return resettedValues;
}

export const handleChange = (
  value: any,
  fieldName: string,
  getValues: UseFormGetValues<FieldValues>,
  setValue: UseFormSetValue<FieldValues>,
  addTableProps: (tableProps: ITableProps) => void
) => {
  const currentFilters: FieldValues = getValues();
  let currentTableProps: ITableProps = {
    ...resetFiltersAndSearchBar(),
  };
  Object.keys(currentFilters).forEach((key: string) => {
    if (
      key === "department" ||
      key === "skills" ||
      key === "role" ||
      key === "search_term"
    ) {
      currentTableProps[key] = currentFilters[key];
    }
  });
  const updatedFilters: ITableProps = {
    ...currentTableProps,
    [fieldName]: value,
  };
  Object.keys(updatedFilters).forEach((key: string) => {
    const tablePropsKey = key as keyof ITableProps;
    setValue(key, updatedFilters[tablePropsKey]);
  });

  addTableProps(updatedFilters);
};

export const getDate = (dateVal: string) => {
  const [year, month, day] = dateVal.split("-");
  const newDate = new Date(`${year}-${month}-${day}`);
  return newDate.toISOString().split("T")[0];
};

export const getWorkExp = (dateOfJoining: string) => {
  const [year, month, day] = dateOfJoining.split("-").map(Number);
  const dateInNewFormat = new Date(year, month - 1, day);
  const DOJ = new Date(dateInNewFormat);
  const now = new Date();
  const workExp: number = Math.floor(
    (now.getTime() - DOJ.getTime()) / (1000 * 60 * 60 * 24 * 30)
  );
  return workExp.toString() + "  months";
};

export const getDateView = (dateVal: string) => {
  const [year, month, day] = dateVal.split("-").map(Number);
  const monthName = new Date(year, month - 1, 1).toLocaleString("default", {
    month: "long",
  });
  const dateFormatted = day + " " + monthName + " " + year;
  return dateFormatted;
};

export const getUrlType = (pathName: string) => {
  const pathParts = pathName.split("/");
  const secondPartOfPath = pathParts[1];
  return secondPartOfPath;
};

export const convertIGetEmployeeToIAppEmployee = (
  employee: IGetEmployee
): IAppEmployee => {
  const {
    moreDetails,
    skills,
    lastName,
    department,
    role,
    email,
    phone,
    designation,
    salary,
    address,
    isActive,
    ...rest
  } = employee;
  return {
    ...rest,
    isActive: isActive ? "Yes" : "No",
    lastName: lastName ? lastName : "",
    email: email ? email : "N/A",
    phone: phone ? phone : "N/A",
    designation: designation ? designation : "N/A",
    salary: salary ? salary : "N/A",
    address: address ? address : "N/A",
    skills: skills.length ? transformArrayToOptionsList(skills) : "N/A",
    department: department
      ? transformArrayToOptionsList([department])[0]
      : "N/A",
    role: role ? transformArrayToOptionsList([role])[0] : "N/A",
    photoId: moreDetails ? JSON.parse(moreDetails).photoId : "",
  };
};

export const convertFormDataToIPostEmployees = async (
  formData: FieldValues
): Promise<IPostEmployee> => {
  const { photoId, skills, department, role, isActive, ...rest } = formData;
  return {
    ...(rest as IPostEmployee),
    skills: skills.map((skill: ISelectOptionProps) => skill.value),
    department: department.value,
    role: role.value,
    isActive: isActive === "Yes" ? true : false,
    moreDetails: JSON.stringify({
      photoId:
        typeof photoId![0] == "object" ? await uploadImage(photoId![0]) : "",
    }),
  };
};
