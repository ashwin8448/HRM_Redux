import { combineReducers } from "redux";
import employeeReducer from "./reducers/employeeReducer";
import dropdownReducer from "./reducers/dropdownReducer/dropdownReducer";

const appReducer = combineReducers({
  employeesData: employeeReducer,
  dropdownData: dropdownReducer,
});

export default appReducer;
