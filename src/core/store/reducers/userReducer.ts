import { getCookie } from "../../../utils/helper.ts";
import { IUser } from "../../interfaces/interface.ts";
import * as actionNames from "../types/actionNames.ts";

const initialState = {
  user: { isAuthenticated: Boolean(getCookie("accessToken")) },
};

function userReducer(
  state = initialState,
  action: {
    type: string;
    payload: IUser;
  }
) {
  switch (action.type) {
    case actionNames.LOGIN:
      return {
        ...state,
        user: {
          isAuthenticated: true,
        },
      };
    case actionNames.LOGOUT:
      return {
        ...state,
        user: {
          isAuthenticated: false,
        },
      };

    default:
      return state;
  }
}

export default userReducer;
