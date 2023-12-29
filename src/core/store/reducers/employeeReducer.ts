import { IActionEmployeeData, IAppEmployee, IEmployeeData } from '../../interfaces/interface.ts';
import * as actionTypes from '../actionTypes.ts';
import { ActionInterface } from '../actions.ts';

const initialState:IEmployeeData = {
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
        employees: (action.payload as IActionEmployeeData).employees,
        count: (action.payload as IActionEmployeeData).count,
      };
    case actionTypes.SET_EMPLOYEES_LIST:
      return {
        ...state,
        employees: (action.payload as IActionEmployeeData).employees,
        count: (action.payload as IActionEmployeeData).count,
      };
    case actionTypes.SET_EMPLOYEES_GRID:
      return {
        ...state,
        employees:
          // typeof action.payload != 'boolean'
          //   ?
            Array.from(
                new Set([...state.employees, ...action.payload.]),
              )
            // : state.employees,
        count: (action.payload as IActionEmployeeData).count,
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
