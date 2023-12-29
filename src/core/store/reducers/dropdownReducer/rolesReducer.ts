import { ISelectOptionProps } from "../../../interfaces/interface.ts";
import * as actionTypes from "../../actionTypes.ts";

const initialState = {
  loading: true,
  roles: [],
};

function rolesReducer(
  state = initialState,
  action: {
    type: string;
    payload: ISelectOptionProps[] | boolean;
  }
) {
  switch (action.type) {
    case actionTypes.SET_ROLES:
      return { ...state, roles: action.payload };
    case actionTypes.SET_ROLES_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export default rolesReducer;
