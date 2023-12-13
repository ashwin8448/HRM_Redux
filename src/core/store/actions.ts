import { toast } from "react-toastify";
import { getData } from "../api/functions.ts";
import * as actionTypes from "./actionTypes.ts";
import { transformArrayToOptionsList } from "../../utils/helper.ts";
import {
  IEmployee,
  IEmployeeData,
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
  employees: IEmployee[];
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

//fetch methods
export const fetchEmployeesData = () => {
  return async function (dispatch: Dispatch) {
    try {
      dispatch(setLoading(true));
      const response = await getData(apiURL.employee);
      const employeesResponseData: IEmployeeData = response.data.data;
      dispatch(setEmployees(employeesResponseData));
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
      .then((reponse) =>
        dispatch(setDepartments(transformArrayToOptionsList(reponse.data)))
      )
      .catch((error) => {
        toast.error("Departments could not be fetched.");
        console.error("Error fetching dropdown data:", error);
      });
    getData(apiURL.skills)
      .then((reponse) =>
        dispatch(setSkills(transformArrayToOptionsList(reponse.data.data)))
      )
      .catch((error) => {
        toast.error("Skills could not be fetched.");
        console.error("Error fetching dropdown data:", error);
      });
    getData(apiURL.roles)
      .then((reponse) =>
        dispatch(setRoles(transformArrayToOptionsList(reponse.data)))
      )
      .catch((error) => {
        toast.error("Roles could not be fetched.");
        console.error("Error fetching dropdown data:", error);
      });
  };
};
