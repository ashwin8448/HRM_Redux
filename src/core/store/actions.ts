import { toast } from "react-toastify";
import { getData } from "../api/functions.ts";

import * as actionTypes from "./actionTypes.ts";
import { transformArrayToOptionsList, transformArrayToSkillOptionsList } from "../../utils/helper.ts";
import { IEmployee, ISelectOptionProps, ITableProps } from "../interfaces/interface.ts";


export const setLoading = (loading: boolean) => ({
  type: actionTypes.SET_LOADING,
  payload: loading,
});
export const setEmployees = (employeesData: {employees:IEmployee[], count: number}) => ({
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