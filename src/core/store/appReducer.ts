import { combineReducers } from "redux";
import employeeReducer from "./reducers/employeeReducer";
import dropdownReducer from "./reducers/dropdownReducer/dropdownReducer";
import filterReducer from "./reducers/filterReducer";
import userReducer from "./reducers/userReducer";

const appReducer = combineReducers({
  employeesData: employeeReducer,
  dropdownData: dropdownReducer,
  filterData: filterReducer,
  userData: userReducer
});

export default appReducer;
