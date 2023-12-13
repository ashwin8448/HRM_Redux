import { combineReducers } from "redux";
import employeeReducer from "./reducers/employeeReducer";
import dropdownReducer from "./reducers/dropdownReducer";
import filterReducer from "./reducers/filterReducer";

const appReducer = combineReducers({
  employeesData: employeeReducer,
  dropdownData: dropdownReducer,
  filterData: filterReducer,
});

export default appReducer;
