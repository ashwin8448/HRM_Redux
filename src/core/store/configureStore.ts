import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import appReducer from "./appReducer.ts";

const composeEnhancers = composeWithDevTools({
  trace: true,
});

const store = createStore(
  appReducer,
  undefined,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
