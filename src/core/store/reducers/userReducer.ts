import { getCookie } from "../../../utils/helper.ts";
import { IUser } from "../../interfaces/interface.ts";
import { ActionInterface } from "../actions.ts";
import * as actionNames from "../types/actionNames.ts";

const initialState = {
  isAuthenticated: Boolean(getCookie("accessToken")),
  employeeDetails: null,
};

function userReducer(state = initialState, action: ActionInterface): IUser {
  switch (action.type) {
    case actionNames.LOGIN:
      return {
        isAuthenticated: true,
        employeeDetails: action.payload!,
      };

    case actionNames.LOGOUT:
      return {
        isAuthenticated: false,
        employeeDetails: null,
      };

    default:
      return state;
  }
}

export default userReducer;
