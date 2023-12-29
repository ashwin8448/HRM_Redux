import { IEmployeeData } from "../../interfaces/interface.ts";
import * as actionTypes from "../actionTypes.ts";
import { ActionInterface } from "../actions.ts";

const initialState: IEmployeeData = {
  employees: [],
  loading: true,
  count: 0,
};

function employeeReducer(
  state = initialState,
  action: ActionInterface
): IEmployeeData {
  
  switch (action.type) {
    case actionTypes.SET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload.employees,
        count: action.payload.count,
      };
    case actionTypes.SET_EMPLOYEES_LIST:
      return {
        ...state,
        employees: action.payload.employees,
        count: action.payload.count,
      };
    case actionTypes.SET_EMPLOYEES_GRID:
      return {
        ...state,
        employees: Array.from(
          new Set([...state.employees, ...action.payload.employees])
        ),
        count: action.payload.count,
      };
    case actionTypes.RESET_EMPLOYEES_GRID:
      return {
        ...state,
        employees: [],
      };
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload.loading };
    default:
      return state;
  }
}

export default employeeReducer;
