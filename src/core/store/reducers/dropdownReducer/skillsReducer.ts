import { ISkillsData } from "../../../interfaces/interface.ts";
import * as actionNames from "../../types/actionNames.ts";
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
    case actionNames.SET_SKILLS:
      return { ...state, skills: action.payload };
    case actionNames.SET_SKILLS_LOADING:
      return { ...state, loading: action.payload.loading };
    default:
      return state;
  }
}

export default skillsReducer;
