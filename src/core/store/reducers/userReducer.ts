import { getToken } from "../../../utils/helper.ts";
import * as actionNames from "../types/actionNames.ts";

const initialState = {
  user: { isAuthenticated: Boolean(getToken("accessToken")) },
};

const userReducer = (
  state = initialState,
  action: { type: string; payload: string }
) => {
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
};

export default userReducer;
