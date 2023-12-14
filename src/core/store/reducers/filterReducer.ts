import { ITableProps } from "../../interfaces/interface.ts";
import * as actionTypes from "../actionTypes.ts";

const initialState = {
  department:  null,
  skills: null,
  role:  null,
  search_term:  null,
};

function filterReducer(
  state = initialState,
  action: {
    type: string;
    payload: ITableProps;
  }
) {
  switch (action.type) {
    case actionTypes.SET_TABLE_PROPS:
      return { ...state, tableProps: action.payload };
    default:
      return state;
  }
}

export default filterReducer;
