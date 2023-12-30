import { combineReducers } from "redux";
import employeeReducer from "./reducers/employeeReducer";
import dropdownReducer from "./reducers/dropdownReducer/dropdownReducer";
import userReducer from "./reducers/userReducer";

const appReducer = combineReducers({
  employeesData: employeeReducer,
  dropdownData: dropdownReducer,
  userData: userReducer
});

export default appReducer;
