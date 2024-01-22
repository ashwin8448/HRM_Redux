import { toast } from "react-toastify";
import { getData } from "../api/functions.ts";
import * as actionNames from "./types/actionNames.ts";
import {
  convertIGetEmployeeToIAppEmployee,
  transformArrayToOptionsList,
} from "../../utils/helper.ts";
import {
  IDepartment,
  IGetEmployee,
  IRole,
  ISelectOptionProps,
  ISkill,
  IActionEmployeeData,
  IAppEmployee,
} from "../interfaces/interface.ts";
import { apiURL, gridDisplay, listDisplay } from "../config/constants.ts";
import { AppDispatch } from "./configureStore.ts";
import * as actionTypes from "./types/actionTypes.ts";

export const setLoading = (
  actionType:
    | "SET_LOADING"
    | "SET_SKILLS_LOADING"
    | "SET_DEPARTMENTS_LOADING"
    | "SET_ROLES_LOADING",
  payload: { loading: boolean }
): actionTypes.ISET_LOADING => ({
  type: actionType,
  payload: payload,
});

export const setEmployees = (
  employeesData: IActionEmployeeData
): actionTypes.ISET_EMPLOYEES => ({
  type: actionNames.SET_EMPLOYEES,
  payload: employeesData,
});

export const setEmployeesForList = (
  employeesData: IActionEmployeeData
): actionTypes.ISET_EMPLOYEES_LIST => ({
  type: actionNames.SET_EMPLOYEES_LIST,
  payload: employeesData,
});

export const setEmployeesForGrid = (
  employeesData: IActionEmployeeData
): actionTypes.ISET_EMPLOYEES_GRID => ({
  type: actionNames.SET_EMPLOYEES_GRID,
  payload: employeesData,
});

export const setDepartments = (
  departments: ISelectOptionProps[]
): actionTypes.ISET_DEPARTMENTS => ({
  type: actionNames.SET_DEPARTMENTS,
  payload: departments,
});

export const setRoles = (
  roles: ISelectOptionProps[]
): actionTypes.ISET_ROLES => ({
  type: actionNames.SET_ROLES,
  payload: roles,
});

export const setSkills = (
  skills: ISelectOptionProps[]
): actionTypes.ISET_SKILLS => ({
  type: actionNames.SET_SKILLS,
  payload: skills,
});

export const resetEmployeesGrid = (): actionTypes.IRESET_EMPLOYEES => {
  return {
    type: actionNames.RESET_EMPLOYEES_GRID,
  };
};

export const setLogin = (
  employeeDetails: Partial<IAppEmployee>
): actionTypes.ISET_USER => ({
  type: actionNames.LOGIN,
  payload: employeeDetails,
});

export const setLogout = (): actionTypes.ISET_USER => ({
  type: actionNames.LOGOUT,
});

export type ActionInterface =
  | actionTypes.ISET_DEPARTMENTS
  | actionTypes.ISET_SKILLS
  | actionTypes.ISET_ROLES
  | actionTypes.ISET_EMPLOYEES
  | actionTypes.ISET_EMPLOYEES_GRID
  | actionTypes.ISET_EMPLOYEES_LIST
  | actionTypes.ISET_LOADING
  | actionTypes.IRESET_EMPLOYEES
  | actionTypes.ISET_USER;

//fetch methods
export const fetchEmployeesData = (
  params: {
    limit: number;
    offset: number;
    sortBy?: string;
    sortDir?: string;
    search?: string;
    skillIds?: string;
  },
  state: string
) => {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(setLoading(actionNames.SET_LOADING, { loading: true }));
      const response = await getData(apiURL.employee, { params: params });
      const employeesResponseData = response.data.data;
      const employees: IGetEmployee[] = employeesResponseData.employees;

      if (state === listDisplay)
        dispatch(
          setEmployeesForList({
            ...employeesResponseData,
            employees: employees.map((employee: IGetEmployee) => {
              return convertIGetEmployeeToIAppEmployee(employee);
            }),
          })
        );
      if (state === gridDisplay)
        dispatch(
          setEmployeesForGrid({
            ...employeesResponseData,
            employees: employees.map((employee: IGetEmployee) => {
              return convertIGetEmployeeToIAppEmployee(employee);
            }),
          })
        );
    } catch (error) {
      toast.error("No data is recieved", { toastId: "no-data" });
      console.error("Error fetching data:", error);
    } finally {
      dispatch(setLoading(actionNames.SET_LOADING, { loading: false }));
    }
  };
};

export const fetchDepartmentsData = () => {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(setLoading(actionNames.SET_DEPARTMENTS_LOADING, { loading: true }));
      // Use Promise.all to fetch data concurrently
      const departmentsResponse = await getData(apiURL.departments);

      // Extract data from responses
      const departmentsResponseData: IDepartment[] = departmentsResponse.data;

      // Dispatch actions
      dispatch(
        setDepartments(transformArrayToOptionsList(departmentsResponseData))
      );
    } catch (error) {
      toast.error("Departments data could not be fetched.", {
        toastId: "no-departments-data",
      });
      console.error("Error fetching dropdown data:", error);
    } finally {
      // Set loading to false for all dropdowns
      dispatch(
        setLoading(actionNames.SET_DEPARTMENTS_LOADING, { loading: false })
      );
    }
  };
};

export const fetchRolesData = () => {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(setLoading(actionNames.SET_ROLES_LOADING, { loading: true }));
      // Use Promise.all to fetch data concurrently
      const rolesResponse = await getData(apiURL.roles);

      // Extract data from responses
      const rolesResponseData: IRole[] = rolesResponse.data;

      // Dispatch actions

      dispatch(setRoles(transformArrayToOptionsList(rolesResponseData)));
    } catch (error) {
      toast.error("Roles data could not be fetched.", {
        toastId: "no-roles-data",
      });
      console.error("Error fetching dropdown data:", error);
    } finally {
      // Set loading to false for all dropdowns
      dispatch(setLoading(actionNames.SET_ROLES_LOADING, { loading: false }));
    }
  };
};

export const fetchSkillsData = () => {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(setLoading(actionNames.SET_SKILLS_LOADING, { loading: true }));
      // Use Promise.all to fetch data concurrently
      const skillsResponse = await getData(apiURL.skills);

      // Extract data from responses
      const skillsResponseData: ISkill[] = skillsResponse.data.data;

      // Dispatch actions
      dispatch(setSkills(transformArrayToOptionsList(skillsResponseData)));
    } catch (error) {
      toast.error("Skills data could not be fetched.", {
        toastId: "no-skills-data",
      });
      console.error("Error fetching skills data:", error);
    } finally {
      // Set loading to false for all dropdowns
      dispatch(setLoading(actionNames.SET_SKILLS_LOADING, { loading: false }));
    }
  };
};
