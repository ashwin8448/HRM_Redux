import { toast } from 'react-toastify';
import { getData } from '../api/functions.ts';
import * as actionTypes from './actionTypes.ts';
import { transformArrayToOptionsList } from '../../utils/helper.ts';
import {
  IDepartment,
  IEmployee,
  IEmployeeData,
  ISelectOptionProps,
  ISkill,
  ITableProps,
} from '../interfaces/interface.ts';
import { apiURL } from '../config/constants.ts';
import { Dispatch } from 'redux';

export const setLoading = (actionType: string, loading: boolean) => ({
  type: actionType,
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
      dispatch(setLoading(actionTypes.SET_LOADING, true));
      const response = await getData(apiURL.employee);
      const employeesResponseData: IEmployeeData = response.data.data;
      const employees = employeesResponseData.employees;
      dispatch(
        setEmployees({
          ...employeesResponseData,
          employees: employees.map((employee) => {
            return {
              ...employee,
              moreDetails: employee.moreDetails
                ? JSON.parse(employee.moreDetails)
                : null,
            };
          }),
        })
      );
    } catch (error) {
      toast.error('No data is recieved', { toastId: 'no-data' });
      console.error('Error fetching data:', error);
    } finally {
      dispatch(setLoading(actionTypes.SET_LOADING, false));
    }
  };
};

export const fetchDropdownData = () => {
  return async function (dispatch: Dispatch) {
    try {
      dispatch(setLoading(actionTypes.SET_DEPARTMENTS_LOADING, true));
      const departmentsResponse = await getData(apiURL.departments);
      const departmentsResponseData: IDepartment[] = departmentsResponse.data;
      dispatch(
        setDepartments(transformArrayToOptionsList(departmentsResponseData))
      );
    } catch (error) {
      toast.error('Departments could not be fetched', {
        toastId: 'no-departments-data',
      });
      console.error('Error fetching dropdown data:', error);
    } finally {
      dispatch(setLoading(actionTypes.SET_DEPARTMENTS_LOADING, false));
    }

    try {
      dispatch(setLoading(actionTypes.SET_ROLES_LOADING, true));
      const rolesResponse = await getData(apiURL.roles);
      const rolesResponseData: ISkill[] = rolesResponse.data;
      dispatch(setRoles(transformArrayToOptionsList(rolesResponseData)));
    } catch (error) {
      toast.error('Roles could not be fetched.', {
        toastId: 'no-roles-data',
      });
      console.error('Error fetching dropdown data:', error);
    } finally {
      dispatch(setLoading(actionTypes.SET_ROLES_LOADING, false));
    }
    
    try {
      dispatch(setLoading(actionTypes.SET_SKILLS_LOADING, true));
      const skillsResponse = await getData(apiURL.skills);
      console.log;
      const skillsResponseData: ISkill[] = skillsResponse.data.data;
      dispatch(setSkills(transformArrayToOptionsList(skillsResponseData)));
    } catch (error) {
      toast.error('Skills could not be fetched.', {
        toastId: 'no-skills-data',
      });
      console.error('Error fetching dropdown data:', error);
    } finally {
      dispatch(setLoading(actionTypes.SET_SKILLS_LOADING, false));
    }
  };
};
