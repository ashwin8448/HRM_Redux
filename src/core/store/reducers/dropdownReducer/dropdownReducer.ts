import { combineReducers } from "redux";
import departmentsReducer from "./departmentsReducer";
import rolesReducer from "./rolesReducer";
import skillsReducer from "./skillsReducer";

const dropdownReducer = combineReducers({
  roles: rolesReducer,
  departments: departmentsReducer,
  skills: skillsReducer,
});

export default dropdownReducer;