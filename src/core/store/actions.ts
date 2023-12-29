import { toast } from "react-toastify";
import { getData } from "../api/functions.ts";
import * as actionTypes from "./actionTypes.ts";
import {
  convertIGetEmployeeToIAppEmployee,
  transformArrayToOptionsList,
} from "../../utils/helper.ts";
import {
  IAppEmployee,
  IGetEmployee,
  ISelectOptionProps,
  ITableProps,
} from "../interfaces/interface.ts";
import { apiURL } from "../config/constants.ts";
import { Dispatch } from "redux";

export const setLoading = (loading: boolean) => ({
  type: actionTypes.SET_LOADING,
  payload: loading,
});

export const setEmployees = (employeesData: {
  employees: IAppEmployee[];
  count: number;
}) => ({
  type: actionTypes.SET_EMPLOYEES,
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

export const setTableProps = (tableProps: ITableProps) => ({
  type: actionTypes.SET_TABLE_PROPS,
  payload: tableProps,
});

export const setLogin = (userName: string) => ({
  type: actionTypes.LOGIN,
  payload: userName,
});

export const setLogout = () => ({
  type: actionTypes.LOGOUT
});

//fetch methods
export const fetchEmployeesData = () => {
  return async function (dispatch: Dispatch) {
    try {
      dispatch(setLoading(true));
      const response = await getData(apiURL.employee);
      const employeesResponseData = response.data.data;
      employees: employeesResponseData.employees.map(
        (employeeData: IGetEmployee) =>
          convertIGetEmployeeToIAppEmployee(employeeData)
      );
      dispatch(
        setEmployees({
          ...employeesResponseData,
          employees: employeesResponseData.employees.map(
            (employeeData: IGetEmployee) =>
              convertIGetEmployeeToIAppEmployee(employeeData)
          ),
        })
      );
      // return dataResponse; // Resolve the promise with the data
    } catch (error) {
      toast.error("No data is recieved", { toastId: "no-data" });
      console.error("Error fetching data:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const fetchDropdownData = () => {
  return function (dispatch: Dispatch) {
    getData(apiURL.departments)
      .then((response) =>
        dispatch(setDepartments(transformArrayToOptionsList(response.data)))
      )
      .catch((error) => {
        toast.error("Departments could not be fetched.");
        console.error("Error fetching dropdown data:", error);
      });
    getData(apiURL.skills)
      .then((response) =>
        dispatch(setSkills(transformArrayToOptionsList(response.data.data)))
      )
      .catch((error) => {
        toast.error("Skills could not be fetched.");
        console.error("Error fetching dropdown data:", error);
      });
    getData(apiURL.roles)
      .then((response) =>
        dispatch(setRoles(transformArrayToOptionsList(response.data)))
      )
      .catch((error) => {
        toast.error("Roles could not be fetched.");
        console.error("Error fetching dropdown data:", error);
      });
  };
};
