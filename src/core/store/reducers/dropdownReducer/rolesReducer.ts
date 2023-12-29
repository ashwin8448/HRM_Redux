import {
  IRolesData,
} from "../../../interfaces/interface.ts";
import * as actionTypes from "../../actionTypes.ts";
import { ActionInterface } from "../../actions.ts";

const initialState: IRolesData = {
  loading: true,
  roles: [],
};

function rolesReducer(
  state = initialState,
  action: ActionInterface
): IRolesData {
  
  switch (action.type) {
    case actionTypes.SET_ROLES:
      return { ...state, roles: action.payload };
    case actionTypes.SET_ROLES_LOADING:
      return { ...state, loading: action.payload.loading };
    default:
      return state;
  }
}

export default rolesReducer;
