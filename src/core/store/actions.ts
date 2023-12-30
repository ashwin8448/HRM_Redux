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
  IRole,
  ISelectOptionProps,
  ISkill,
  IActionEmployeeData,
} from "../interfaces/interface.ts";
import { apiURL } from "../config/constants.ts";
import { AppDispatch } from "./configureStore.ts";

interface ISET_LOADING {
  type:
    | "SET_LOADING"
    | "SET_SKILLS_LOADING"
    | "SET_DEPARTMENTS_LOADING"
    | "SET_ROLES_LOADING";
  payload: {
    loading: boolean;
  };
}
interface ISET_EMPLOYEES {
  type: "SET_EMPLOYEES";
  payload: IActionEmployeeData;
}

interface ISET_EMPLOYEES_LIST {
  type: "SET_EMPLOYEES_LIST";
  payload: IActionEmployeeData;
}

interface ISET_EMPLOYEES_GRID {
  type: "SET_EMPLOYEES_GRID";
  payload: IActionEmployeeData;
}

interface ISET_DEPARTMENTS {
  type: "SET_DEPARTMENTS";
  payload: ISelectOptionProps[];
}

interface ISET_ROLES {
  type: "SET_ROLES";
  payload: ISelectOptionProps[];
}

interface ISET_SKILLS {
  type: "SET_SKILLS";
  payload: ISelectOptionProps[];
}

interface IRESET_EMPLOYEES {
  type: "RESET_EMPLOYEES_GRID";
}

export const setLoading = (
  actionType:
    | "SET_LOADING"
    | "SET_SKILLS_LOADING"
    | "SET_DEPARTMENTS_LOADING"
    | "SET_ROLES_LOADING",
  payload: { loading: boolean }
): ISET_LOADING => ({
  type: actionType,
  payload: payload,
});
export const setEmployees = (
  employeesData: IActionEmployeeData
): ISET_EMPLOYEES => ({
  type: actionTypes.SET_EMPLOYEES,
  payload: employeesData,
});
export const setEmployeesForList = (
  employeesData: IActionEmployeeData
): ISET_EMPLOYEES_LIST => ({
  type: actionTypes.SET_EMPLOYEES_LIST,
  payload: employeesData,
});
export const setEmployeesForGrid = (
  employeesData: IActionEmployeeData
): ISET_EMPLOYEES_GRID => ({
  type: actionTypes.SET_EMPLOYEES_GRID,
  payload: employeesData,
});
export const setDepartments = (
  departments: ISelectOptionProps[]
): ISET_DEPARTMENTS => ({
  type: actionTypes.SET_DEPARTMENTS,
  payload: departments,
});
export const setRoles = (roles: ISelectOptionProps[]): ISET_ROLES => ({
  type: actionTypes.SET_ROLES,
  payload: roles,
});
export const setSkills = (skills: ISelectOptionProps[]): ISET_SKILLS => ({
  type: actionTypes.SET_SKILLS,
  payload: skills,
});
export const resetEmployeesGrid = (): IRESET_EMPLOYEES => {
  return {
    type: actionTypes.RESET_EMPLOYEES_GRID,
  };
};
export const setlogin = () => ({
  type: actionTypes.LOGIN,
});
export const setlogout = () => ({
  type: actionTypes.LOGOUT,
});

export type ActionInterface =
  | ISET_DEPARTMENTS
  | ISET_SKILLS
  | ISET_ROLES
  | ISET_EMPLOYEES
  | ISET_EMPLOYEES_GRID
  | ISET_EMPLOYEES_LIST
  | ISET_LOADING
  | IRESET_EMPLOYEES;

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
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(setLoading(actionTypes.SET_LOADING, { loading: true }));
      const response = await getData(apiURL.employee, { params: params });
      const employeesResponseData = response.data.data;
      const employees: IGetEmployee[] = employeesResponseData.employees;

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
      dispatch(setLoading(actionTypes.SET_LOADING, { loading: false }));
    }
  };
};

export const fetchDepartmentsData = () => {
  return async function (dispatch: AppDispatch) {
    try {
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
        setLoading(actionTypes.SET_DEPARTMENTS_LOADING, { loading: false })
      );
    }
  };
};

export const fetchRolesData = () => {
  return async function (dispatch: AppDispatch) {
    try {
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
      dispatch(setLoading(actionTypes.SET_ROLES_LOADING, { loading: false }));
    }
  };
};

export const fetchSkillsData = () => {
  return async function (dispatch: AppDispatch) {
    try {
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
      dispatch(setLoading(actionTypes.SET_SKILLS_LOADING, { loading: false }));
    }
  };
};
