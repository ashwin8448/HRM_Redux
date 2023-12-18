import { IEmployee } from "../../interfaces/interface.ts";
import * as actionTypes from "../actionTypes.ts";

const initialState = {
  employees: [],
  employeesForList: [],
  employeesForGrid: [],
  loading: true,
  count: 0,
};

function employeeReducer(
  state = initialState,
  action: {
    type: string;
    payload: { employees: IEmployee[]; count: number } | boolean;
  }
) {
  switch (action.type) {
    case actionTypes.SET_EMPLOYEES:
      return {
        ...state,
        employees:
          typeof action.payload != "boolean" && action.payload.employees,
        count: typeof action.payload != "boolean" && action.payload.count,
      };
    case actionTypes.SET_EMPLOYEES_LIST:
      return {
        ...state,
        employeesForList:
          typeof action.payload != "boolean" && action.payload.employees,
        count: typeof action.payload != "boolean" && action.payload.count,
      };
    case actionTypes.SET_EMPLOYEES_GRID:
      return {
        ...state,
        employeesForGrid: typeof action.payload != "boolean" ? Array.from(
          new Set([...state.employeesForGrid, ...action.payload.employees])
        ): state.employeesForGrid,
        count: typeof action.payload != "boolean" && action.payload.count,
      };
      case actionTypes.RESET_EMPLOYEES_GRID:
        return {
          ...state,
          employeesForGrid: [],
        };  
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export default employeeReducer;