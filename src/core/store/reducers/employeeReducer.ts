import { IEmployeeData } from "../../interfaces/interface.ts";
import * as actionNames from "../types/actionNames.ts";
import { ActionInterface } from "../actions.ts";

const initialState: IEmployeeData = {
  employees: [],
  loading: false,
  count: 0,
};

function employeeReducer(
  state = initialState,
  action: ActionInterface
): IEmployeeData {
  switch (action.type) {
    case actionNames.SET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload.employees,
        count: action.payload.count,
      };
    case actionNames.SET_EMPLOYEES_LIST:
      return {
        ...state,
        employees: action.payload.employees,
        count: action.payload.count,
      };
    case actionNames.SET_EMPLOYEES_GRID:{
      
    const mergedEmployees = [...state.employees];
    action.payload.employees.forEach(newEmployee => {
      const existingEmployeeIndex = mergedEmployees.findIndex(existingEmployee => existingEmployee.id === newEmployee.id);
    
      if (existingEmployeeIndex !== -1) {
        // If an employee with the same ID exists, replace it with the new employee
        mergedEmployees[existingEmployeeIndex] = newEmployee;
      } else {
        // If no employee with the same ID exists, add the new employee to the array
        mergedEmployees.push(newEmployee);
      }
    });
    
      return {
        ...state,
        employees: mergedEmployees,
        count: action.payload.count,
      };}
    case actionNames.RESET_EMPLOYEES_GRID:
      return {
        ...state,
        employees: [],
      };
    case actionNames.SET_LOADING:
      return { ...state, loading: action.payload.loading };
    default:
      return state;
  }
}

export default employeeReducer;
