import { ISelectOptionProps } from "../../../interfaces/interface.ts";
import * as actionTypes from "../../actionTypes.ts";

const initialState = {
  loading: true,
  departments: [],
};

function departmentsReducer(
  state = initialState,
  action: {
    type: string;
    payload: ISelectOptionProps[] | boolean;
  }
) {
  switch (action.type) {
    case actionTypes.SET_DEPARTMENTS:
      return { ...state, departments: action.payload };
    case actionTypes.SET_DEPARTMENTS_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export default departmentsReducer;
