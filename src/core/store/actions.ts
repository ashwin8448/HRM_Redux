import { toast } from "react-toastify";
import { getData } from "../api/functions.ts";
import * as actionTypes from "./actionTypes.ts";
import {
  convertIGetEmployeeToIAppEmployee,
  transformArrayToOptionsList,
} from "../../utils/helper.ts";
import {
  IDepartment,
  IGetEmployee,
  IAppEmployee,
  IRole,
  ISelectOptionProps,
  ISkill,
} from "../interfaces/interface.ts";
import { apiURL } from "../config/constants.ts";
import { Dispatch } from "redux";

export const setLoading = (actionType: string, loading: boolean) => ({
  type: actionType,
  payload: loading,
});

export const setEmployees = (employeesData: {
  employees: IAppEmployee[];
  count: number;
}) => ({
  type: actionTypes.SET_EMPLOYEES,
  payload: employeesData,
});

export const setEmployeesForList = (employeesData: {
  employees: IAppEmployee[];
  count: number;
}) => ({
  type: actionTypes.SET_EMPLOYEES_LIST,
  payload: employeesData,
});

export const setEmployeesForGrid = (employeesData: {
  employees: IAppEmployee[];
  count: number;
}) => ({
  type: actionTypes.SET_EMPLOYEES_GRID,
  payload: employeesData,
});

export const setDepartments = (departments: ISelectOptionProps[]) => ({
  type: actionTypes.SET_DEPARTMENTS,
  payload: departments,
});

export const setRoles = (roles: ISelectOptionProps[]) => ({
  type: actionTypes.SET_ROLES,
  payload: roles,
});

export const setSkills = (skills: ISelectOptionProps[]) => ({
  type: actionTypes.SET_SKILLS,
  payload: skills,
});

export const resetEmployeesGrid = () => {
  return {
    type: actionTypes.RESET_EMPLOYEES_GRID,
  };
};

//fetch methods
export const fetchEmployeesData = (
  params: {
    limit: number;
    offset: number;
    sortBy: string;
    sortDir: string;
    search: string;
    skillIds: string;
  },
  state: string
) => {
  return async function (dispatch: Dispatch) {
    try {
      dispatch(setLoading(actionTypes.SET_LOADING, true));
      const response = await getData(apiURL.employee, { params: params });
      const employeesResponseData = response.data.data;
      const employees = employeesResponseData.employees;
      if (state === "List")
        dispatch(
          setEmployeesForList({
            ...employeesResponseData,
            employees: employees.map((employee: IGetEmployee) => {
              return convertIGetEmployeeToIAppEmployee(employee);
            }),
          })
        );
      else
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
      dispatch(setLoading(actionTypes.SET_LOADING, false));
    }
  };
};

export const fetchDropdownData = () => {
  return async function (dispatch: Dispatch) {
    try {
      // Use Promise.all to fetch data concurrently
      const [departmentsResponse, rolesResponse, skillsResponse] =
        await Promise.all([
          getData(apiURL.departments),
          getData(apiURL.roles),
          getData(apiURL.skills),
        ]);

      // Extract data from responses
      const departmentsResponseData: IDepartment[] = departmentsResponse.data;
      const rolesResponseData: ISkill[] = rolesResponse.data;
      const skillsResponseData: ISkill[] = skillsResponse.data.data;

      // Dispatch actions
      dispatch(
        setDepartments(transformArrayToOptionsList(departmentsResponseData))
      );
      dispatch(setRoles(transformArrayToOptionsList(rolesResponseData)));
      dispatch(setSkills(transformArrayToOptionsList(skillsResponseData)));
    } catch (error) {
      toast.error("Dropdown data could not be fetched.", {
        toastId: "no-dropdown-data",
      });
      console.error("Error fetching dropdown data:", error);
    } finally {
      // Set loading to false for all dropdowns
      dispatch(setLoading(actionTypes.SET_DEPARTMENTS_LOADING, false));
      dispatch(setLoading(actionTypes.SET_ROLES_LOADING, false));
      dispatch(setLoading(actionTypes.SET_SKILLS_LOADING, false));
    }
  };
};
