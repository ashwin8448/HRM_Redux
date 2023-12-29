import { IUser } from '../../interfaces/interface.ts';
import * as actionTypes from '../actionTypes.ts';

const initialState = {
  user: { isAuthenticated: false },
};

function userReducer(
  state = initialState,
  action: {
    type: string;
    payload: IUser;
  }
) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        user: {
          isAuthenticated: true,
        },
      };
    case actionTypes.LOGOUT:
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
