import {
  IDepartmentsData,
} from "../../../interfaces/interface.ts";
import * as actionTypes from "../../actionTypes.ts";
import { ActionInterface } from "../../actions.ts";

const initialState: IDepartmentsData = {
  loading: true,
  departments: [],
};

function departmentsReducer(
  state = initialState,
  action: ActionInterface
): IDepartmentsData {
  switch (action.type) {
    case actionTypes.SET_DEPARTMENTS:
      return { ...state, departments: action.payload };
    case actionTypes.SET_DEPARTMENTS_LOADING:
      return { ...state, loading: action.payload.loading };
    default:
      return state;
  }
}

export default departmentsReducer;
