import {
  FieldValues,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";
import {
  IDepartment,
  IEmployee,
  IEmployeePost,
  IFormEmployee,
  IRole,
  ISelectOptionProps,
  ISkill,
  ITableProps,
} from "../core/interfaces/interface.ts";
import React from "react";
import { SortDirection } from "../core/config/constants.ts";

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

export function concatenateNames(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}
//TODO
export function convertToFormEmployee(employee: IEmployee): IFormEmployee {
  return {
    id: employee.id,
    firstName: employee.firstName,
    lastName: employee.lastName,
    dob: employee.dob,
    email: employee.email,
    phone: employee.phone,
    designation: employee.designation,
    salary: employee.salary,
    dateOfJoining: employee.dateOfJoining,
    address: employee.address,
    role: {
      label: employee.role.role,
      value: employee.role.id,
    },
    department: transformArrayToOptionsList(employee.department),
    skills: transformArrayToOptionsList(employee.skills),
  };
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

export function defaultFormVal() {
  const resettedVals = {
    ...resetFiltersAndSearchBar(),
    firstName: null,
    lastName: null,
    dob: null,
    email: null,
    phone: null,
    address: null,
    dateOfJoining: null,
    gender: null,
    isActive: null,
  };
  return resettedVals;
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

export const filterData = (employees: IEmployee[], tableProps: ITableProps) => {
  let employeeTableData = employees;

  if (tableProps) {
    employeeTableData = employees.filter((employee: IEmployee) => {
      if (employee) {
        const skillMatch = tableProps.skills
          ? tableProps.skills.every((skillFilter: ISelectOptionProps) => {
              return (
                employee.skills &&
                employee.skills.some((skill) => skill.id === skillFilter.value)
              );
            })
          : true;
        const departmentMatch =
          tableProps.department && employee.department
            ? tableProps.department.value === employee.department.id
            : true;
        const roleMatch =
          tableProps.role && employee.role
            ? tableProps.role.value === employee.role.id
            : true;

        return skillMatch && departmentMatch && roleMatch;
      }
      return true;
    });
  }
  return employeeTableData;
};

export const searchData = (
  employees: IEmployee[],
  tableProps: ITableProps
): IEmployee[] => {
  if (
    !tableProps ||
    !tableProps["search_term"] ||
    tableProps["search_term"] === ""
  ) {
    return employees;
  }
  const searchText = tableProps["search_term"].toLowerCase();

  return employees.filter(
    (employee) =>
      employee &&
      concatenateNames(
        employee.firstName,
        employee.lastName ? employee.lastName : ""
      )
        .toLowerCase()
        .includes(searchText)
  );
};

export const findSortCriteria = (children: React.ReactNode) => {
  let sortCriteria = "id";
  if (children === "Employment Id") {
    sortCriteria = "id";
  }
  if (children === "Name") {
    sortCriteria = "emp_name";
  }
  if (children === "Designation") {
    sortCriteria = "designation";
  }
  if (children === "Department") {
    sortCriteria = "department";
  }
  if (children === "Employment Modes") {
    sortCriteria = "employment_mode";
  }
  return sortCriteria;
};

export const sortFn = (x: string, y: string, flag: number) => {
  if (x > y) {
    return flag;
  }
  if (y > x) {
    return -1 * flag;
  }
  return 0;
};

export const sortData = (employees: IEmployee[], tableProps: ITableProps) => {
  let sortedEmployees = employees;

  // if (tableProps && tableProps.sort && tableProps.sort.sortTerm != "") {
  //   const sortProp = tableProps.sort;
  //   let flag = sortProp.sortVal === SortDirection.ASC ? -1 : +1;

  //   sortedEmployees = employees.sort((a: IEmployee, b: IEmployee) => {
  //     if (a && b) {
  //       let x = a[sortProp.sortTerm as keyof Employee];
  //       let y = b[sortProp.sortTerm as keyof Employee];
  //       if (typeof x === "string" && typeof y === "string") {
  //         return sortFn(x.toLowerCase(), y.toLowerCase(), flag);
  //       } else {
  //         return 0;
  //       }
  //     }
  //     return 0;
  //   });
  //   employees = sortedEmployees;
  // }
  return sortedEmployees;
};

export const getNewEmpId = (employeesCount: number) => {
  //Creating the new id
  if (employeesCount) {
    const newEmpId = employeesCount + 1;
    const newEmpIdStr =
      newEmpId.toString().length <= 2
        ? "0".concat(newEmpId.toString())
        : newEmpId.toString();
    return "EMP".concat(newEmpIdStr);
  } else {
    return "EMP001";
  }
};

export const getNewEmployeeDetails = (formData: FieldValues): IEmployeePost => {
  console.log(formData.department);
  const { photoId, skills, department, role, isActive, ...rest } = formData;

  return {
    ...rest,
    skills: skills.map((skill: ISelectOptionProps) => skill.value),
    department: department[0].value,
    role: role[0].value,
    isActive: isActive === "Yes" ? true : false,
  };

  // return {
  //   ...formData,
  //   skills: formData.skills.map((skill: ISelectOptionProps) => skill.value),
  //   department: formData.department[0].value,
  //   role: formData.role[0].value,
  //   isActive: formData.isActive === "Yes" ? true : false,
  //   ...("photoId" in formData ? {} : { photoId: undefined }),
  // };
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

export const generatePlaceholder = (fieldName: string): string => {
  return `Select ${fieldName.replace(/_/g, " ").toLowerCase()}`;
};

export const getUrlType = (pathName: string) => {
  const pathParts = pathName.split("/");
  const secondPartOfPath = pathParts[1];
  return secondPartOfPath;
};

export const checkEmployeesEqual = (
  originalEmployee: IEmployee,
  editedEmployee: FieldValues
) => {
  const originalEmpKeys = Object.keys(originalEmployee);

  for (let key of originalEmpKeys) {
    const keyProp = key as keyof IEmployee;
    if (originalEmployee[keyProp] != editedEmployee[keyProp]) {
      if (keyProp === "skills" && originalEmployee.skills) {
        const skillsEqual = checkSkillsEqual(
          originalEmployee[keyProp]!,
          editedEmployee[keyProp]!
        );
        if (skillsEqual) return true;
        return false;
      }
      return false;
    }
  }
  return true;
};

export const checkSkillsEqual = (
  originalSkillList: ISkill[],
  editedSkillList: ISkill[]
) => {
  if (originalSkillList.length != editedSkillList.length) {
    return false;
  }

  for (let i = 0; i < originalSkillList.length; i++) {
    const originalSkill = originalSkillList[i];
    const editedSkill = editedSkillList[i];

    const originalSkillKeys = Object.keys(originalSkill);
    for (let key of originalSkillKeys) {
      const keyProp = key as keyof ISkill;
      if (originalSkill[keyProp] != editedSkill[keyProp]) {
        return false;
      }
    }
  }

  return true;
};

export const removeNullEmployees = (employees: IEmployee[]) => {
  return employees.filter((employee) => {
    if (employee) {
      return employee;
    }
  });
};
