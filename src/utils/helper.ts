import {
  FieldValues,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";
import { Employee, FormEmployee, ISelectOptionProps, Skill, TableProps } from "../core/interfaces/interface.ts";
import React from "react";
import { SortDirection } from "../core/constants/constants.ts";

export function transformArrayToOptionsList(array: string[]) {
  return array.map((value: string) => ({
    value: value,
    label: value,
  }));
}

export function transformArrayToSkillOptionsList(skills: Skill[]) {
  return skills.map((skill) => ({
    value: skill.id,
    label: skill.name,
  }));
}
export function convertToFormEmployee(employee: Employee): FormEmployee {
  return {
    address: employee.address,
    date_of_birth: employee.date_of_birth,
    date_of_joining: employee.date_of_joining,
    department: { label: employee.department, value: employee.department },
    designation: { label: employee.designation, value: employee.designation },
    emp_name: employee.emp_name,
    employment_mode: { label: employee.employment_mode, value: employee.employment_mode },
    email: employee.email,
    gender: employee.gender,
    id: employee.id,
    phone: employee.phone,
    skills: transformArrayToSkillOptionsList(employee.skills),
  };
}
export function resetFiltersAndSearchBar() {
  const resettedValues = {
    department: null,
    role: null,
    skills: null,
    search_term: ""
  }
  return resettedValues;
}

export function defaultFormVal() {
  const resettedVals = {
    ...resetFiltersAndSearchBar(),
    emp_name: null,
    email: null,
    phone: null,
    address: null,
    date_of_birth: null,
    date_of_joining: null,
    gender: null,
    id: null
  }
  return resettedVals;
}
export const handleChange = (
  value: any,
  fieldName: string,
  getValues: UseFormGetValues<FieldValues>,
  setValue: UseFormSetValue<FieldValues>,
  tableProps: TableProps,
  addTableProps: (tableProps: TableProps) => void
) => {
  const currentFilters: FieldValues = getValues();
  let currentTableProps: TableProps = {
    ...resetFiltersAndSearchBar(),
    sort: tableProps.sort,
  };
  Object.keys(currentFilters).forEach((key: string) => {
    if (
      key === "department" ||
      key === "designation" ||
      key === "skills" ||
      key === "employment_mode" ||
      key === "search_term"
    ) {
      currentTableProps[key] = currentFilters[key];
    }
  });
  const updatedFilters: TableProps = {
    ...currentTableProps,
    [fieldName]: value,
  };
  Object.keys(updatedFilters).forEach((key: string) => {
    const tablePropsKey = key as keyof TableProps;
    setValue(key, updatedFilters[tablePropsKey]);
  });

  addTableProps(updatedFilters);
};

export const filterData = (employees: Employee[], tableProps: TableProps) => {
  let employeeTableData = employees;

  if (
    tableProps
  ) {
    employeeTableData = employees.filter((employee) => {
      if (employee) {
        const designationMatch = tableProps.designation
          ? tableProps.designation.value === employee.designation
          : true;
        const skillMatch = tableProps.skills
          ? tableProps.skills.every((skillFilter: ISelectOptionProps) => {
            return employee.skills.some(
              (skill) => skill.id === skillFilter.value
            );
          })
          : true;
        const departmentMatch = tableProps.department
          ? tableProps.department.value === employee.department
          : true;
        const empModeMatch = tableProps.employment_mode
          ? tableProps.employment_mode.value === employee.employment_mode
          : true;

        return designationMatch && skillMatch && departmentMatch && empModeMatch;
      }
      return true;
    });
  }
  return employeeTableData;
};

export const searchData = (
  employees: Employee[],
  tableProps: TableProps
): Employee[] => {
  if (
    !tableProps ||
    !tableProps["search_term"] ||
    tableProps["search_term"] === ""
  ) {
    return employees;
  }
  const searchText = tableProps["search_term"].toLowerCase();

  return employees.filter((employee) =>
    employee &&
    employee["emp_name"].toLowerCase().includes(searchText)
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

export const sortData = (
  employees: Employee[],
  tableProps: TableProps
) => {
  let sortedEmployees = employees;

  if (tableProps && tableProps.sort && tableProps.sort.sortTerm != "") {
    const sortProp = tableProps.sort;
    let flag = sortProp.sortVal === SortDirection.ASC ? -1 : +1;

    sortedEmployees = employees.sort((a: Employee, b: Employee) => {
      if (a && b) {
        let x = a[sortProp.sortTerm as keyof Employee];
        let y = b[sortProp.sortTerm as keyof Employee];
        if (typeof x === "string" && typeof y === "string") {
          return sortFn(x.toLowerCase(), y.toLowerCase(), flag);
        } else {
          return 0;
        }
      }
      return 0;
    });
    employees = sortedEmployees
  }
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

export const getNewEmployeeDetails = (formData: FieldValues) => {
  const skillsInNewFormat = formData.skills.map((skill: ISelectOptionProps) => ({
    id: skill.value,
    name: skill.label,
  }));
  const transformedInput = {
    emp_name: formData.emp_name,
    email: formData.email,
    phone: formData.phone,
    address: formData.address,
    skills: skillsInNewFormat,
    gender: formData.gender,
    date_of_birth: formData.date_of_birth,
    date_of_joining: formData.date_of_joining,
    designation: formData.designation.value,
    department: formData.department.value,
    employment_mode: formData.employment_mode.value,
  };

  return transformedInput;
};

export const getDate = (dateVal: string) => {
  const [year, month, day] = dateVal.split("-");
  const newDate = new Date(`${year}-${month}-${day}`);
  return newDate.toISOString().split('T')[0];
}

export const getWorkExp = (dateOfJoining: string) => {
  const [year, month, day] = dateOfJoining.split('-').map(Number);
  const dateInNewFormat = new Date(year, month - 1, day);
  const DOJ = new Date(dateInNewFormat);
  const now = new Date();
  const workExp: number = Math.floor((now.getTime() - DOJ.getTime()) / (1000 * 60 * 60 * 24 * 30));
  return (workExp.toString() + "  months");
}

export const getDateView = (dateVal: string) => {
  const [year, month, day] = dateVal.split("-").map(Number);
  const monthName = new Date(year, month - 1, 1).toLocaleString('default', { month: 'long' });
  const dateFormatted = day + " " + monthName + " " + year;
  return dateFormatted;
}

export const generatePlaceholder = (fieldName: string): string => {
  return `Select ${fieldName.replace(/_/g, " ").toLowerCase()}`;
}

export const getUrlType = (pathName: string) => {
  const pathParts = pathName.split('/');
  const secondPartOfPath = pathParts[1];
  return secondPartOfPath;
}

export const checkEmployeesEqual = (originalEmployee: Employee, editedEmployee: Employee) => {
  const originalEmpKeys = Object.keys(originalEmployee);

  for (let key of originalEmpKeys) {
    const keyProp = key as keyof Employee;
    if (originalEmployee[keyProp] != editedEmployee[keyProp]) {
      if (keyProp === "skills") {
        const skillsEqual = checkSkillsEqual(originalEmployee[keyProp], editedEmployee[keyProp]);
        if (skillsEqual) return true;
        return false
      }
      return false
    }
  }
  return true;
}

export const checkSkillsEqual = (originalSkillList: Skill[], editedSkillList: Skill[]) => {

  if (originalSkillList.length != editedSkillList.length) {
    return false;
  }

  for (let i = 0; i < originalSkillList.length; i++) {
    const originalSkill = originalSkillList[i];
    const editedSkill = editedSkillList[i];

    const originalSkillKeys = Object.keys(originalSkill);
    for (let key of originalSkillKeys) {
      const keyProp = key as keyof Skill;
      if (originalSkill[keyProp] != editedSkill[keyProp]) {
        return false
      }
    }
  }

  return true;
}

export const removeNullEmployees = (employees: Employee[]) => {
  return employees.filter((employee) => {
    if (employee) {
      return employee
    }
  })
}