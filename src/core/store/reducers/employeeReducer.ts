import { IEmployee } from "../../interfaces/interface.ts";
import * as actionTypes from "../actionTypes.ts";

const initialState = {
  employeesForList: [],
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
        employeesForList:
          typeof action.payload != "boolean" && action.payload.employees,
        count: typeof action.payload != "boolean" && action.payload.count,
      };
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export default employeeReducer;
