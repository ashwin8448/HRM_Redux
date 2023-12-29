import {
  ISkillsData,
} from "../../../interfaces/interface.ts";
import * as actionTypes from "../../actionTypes.ts";
import { ActionInterface } from "../../actions.ts";

const initialState: ISkillsData = {
  loading: true,
  skills: [],
};

function skillsReducer(
  state = initialState,
  action: ActionInterface
): ISkillsData {
  
  switch (action.type) {
    case actionTypes.SET_SKILLS:
      return { ...state, skills: action.payload };
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload.loading };
    default:
      return state;
  }
}

export default skillsReducer;
