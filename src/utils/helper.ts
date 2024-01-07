import { FieldValues } from "react-hook-form";
import {
  IAppEmployee,
  IDepartment,
  IGetEmployee,
  IPostEmployee,
  IRole,
  ISelectOptionProps,
  ISkill,
} from "../core/interfaces/interface.ts";
import { uploadImage } from "./firebase.ts";
import { postData } from "../core/api/functions.ts";
import { apiURL } from "../core/config/constants.ts";
import { jwtDecode } from "jwt-decode";

export const updateSearchParams = (
  setSearchParams: (params: URLSearchParams) => void,
  currentSearchParams: URLSearchParams,
  newParams: Record<string, string | undefined>
) => {
  const updatedSearchParams = new URLSearchParams(currentSearchParams);

  for (const key in newParams) {
    if (newParams[key] !== undefined) {
      updatedSearchParams.set(key, newParams[key]!);
    } else {
      updatedSearchParams.delete(key);
    }
  }

  setSearchParams(updatedSearchParams);
};

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
  if (workExp < 1) return "Less than a month";
  else if (workExp <= 12) {
    return workExp === 12
      ? "1 year"
      : `${workExp} month${workExp > 1 ? "s" : ""}`;
  } else {
    const years = Math.floor(workExp / 12);
    const remainingMonths = workExp % 12;

    const yearsText = years > 0 ? `${years} year${years > 1 ? "s" : ""}` : "";
    const monthsText =
      remainingMonths > 0
        ? `${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`
        : "";

    return `${yearsText}${yearsText && monthsText ? " " : ""}${monthsText}`;
  }
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
    id,
    ...rest
  } = employee;
  const moreDetailsObject = moreDetails ? JSON.parse(moreDetails) : {};
  return {
    ...rest,
    id: String(id),
    isActive: isActive,
    lastName: lastName ?? "",
    email: email ?? "",
    phone: phone ?? "",
    designation: designation ?? "",
    salary: salary ?? "",
    address: address ?? "",
    skills: transformArrayToOptionsList(skills),
    department: department
      ? transformArrayToOptionsList([department])[0]
      : { value: 0, label: "" },
    role: role
      ? transformArrayToOptionsList([role])[0]
      : { value: 0, label: "" },
    photoId: moreDetailsObject.photoId || "",
    isNew: moreDetailsObject.isNew || false,
    accessControlRole: moreDetailsObject.accessControlRole || "user",
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
      photoId: photoId
        ? typeof photoId![0] == "object"
          ? await uploadImage(photoId![0])
          : photoId
        : "",
    }),
  };
};
export function concatenateNames(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts: string[] = value?.split(`; ${name}=`) ?? [];
  if (parts && parts.length === 2) return parts?.pop()?.split(";")?.shift();
  return null;
}

export function setCookie(name: string, value: string) {
  const decodedToken = jwtDecode(value); //getting the payload of the token
  const expiration = new Date(0); // Start with Unix epoch

  if (decodedToken && decodedToken.exp) {
    expiration.setUTCSeconds(decodedToken.exp); //set expiration time of cookie with the expiration time of token
  }

  const cookieValue =
    encodeURIComponent(value) +
    (decodedToken.exp ? `; expires=${expiration.toUTCString()}` : ""); //convert expiration time to string

  document.cookie = `${name}=${cookieValue}; path=/`;
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`; //setting expiration time to epoch
}

export const getNewRefreshToken = async () => {
  const refreshToken = getCookie("refreshToken");
  if (refreshToken) {
    try {
      const response = await postData(apiURL.authRenew, {
        refreshToken,
      });
      const responseData: { access_token: string; refresh_token: string } =
        response.data;
      return responseData;
    } catch (err) {
      console.error(err);
      return;
    }
  } else return;
};

export const handleCheckboxChange = ({
  employeeId,
  deleteCheckBoxesList,
  employeesIdList,
}: {
  employeeId?: string;
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
  employeesIdList?: string[];
}) => {
  deleteCheckBoxesList.setCheckedBoxesList((prevList) => {
    if (employeeId) {
      // Toggle the checkbox for individual employee
      return prevList.includes(employeeId)
        ? prevList.filter((id) => id !== employeeId)
        : [...prevList, employeeId];
    } else if (employeesIdList) {
      // Toggle the checkbox for all employees
      return prevList.length === employeesIdList.length
        ? [] // Uncheck all if all are checked
        : employeesIdList; // Check all if not all are checked
    }

    return prevList;
  });
};
