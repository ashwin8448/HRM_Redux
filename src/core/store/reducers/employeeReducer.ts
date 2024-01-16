import { IEmployeeData } from "../../interfaces/interface.ts";
import * as actionNames from "../types/actionNames.ts";
import { ActionInterface } from "../actions.ts";

const initialState: IEmployeeData = {
  employees: [],
  loading: false,
  count: null,
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
      return {
        ...state,
        employees: [...state.employees,...action.payload.employees],
        count: action.payload.count,
      };}
    case actionNames.RESET_EMPLOYEES_GRID:
      return {
        ...state,
        employees: [],
        count: null
      };
    case actionNames.SET_LOADING:
      return { ...state, loading: action.payload.loading };
    default:
      return state;
  }
}

export default employeeReducer;
