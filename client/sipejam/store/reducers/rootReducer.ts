import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { systemReducer } from "./systemReducer";

export const rootReducer = combineReducers({
  authReducer,
  systemReducer,
});
