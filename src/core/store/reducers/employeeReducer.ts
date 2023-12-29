import { IReceivingEmployee } from "../../interfaces/interface.ts";
import * as actionTypes from "../actionTypes.ts";

const initialState = {
  employees: [],
  loading: true,
  count: 0,
};

function employeeReducer(
  state = initialState,
  action: {
    type: string;
    payload: { employees: IReceivingEmployee[]; count: number } | boolean;
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
        employees:
          typeof action.payload != "boolean" && action.payload.employees,
        count: typeof action.payload != "boolean" && action.payload.count,
      };
    case actionTypes.SET_EMPLOYEES_GRID:
      return {
        ...state,
        employees:
          typeof action.payload != "boolean"
            ? Array.from(
                new Set([...state.employees, ...action.payload.employees])
              )
            : state.employees,
        count: typeof action.payload != "boolean" && action.payload.count,
      };
    case actionTypes.RESET_EMPLOYEES_GRID:
      return {
        ...state,
        employees: [],
      };
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export default employeeReducer;
