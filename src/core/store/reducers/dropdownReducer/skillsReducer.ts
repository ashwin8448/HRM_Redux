import { ISelectOptionProps } from "../../../interfaces/interface.ts";
import * as actionTypes from "../../actionTypes.ts";

const initialState = {
  loading: true,
  skills: [],
};

function skillsReducer(
  state = initialState,
  action: {
    type: string;
    payload: ISelectOptionProps[] | boolean;
  }
) {
  switch (action.type) {
    case actionTypes.SET_SKILLS:
      return { ...state, roles: action.payload };
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export default skillsReducer;
