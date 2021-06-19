import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { systemReducer } from "./systemReducer";
import { systemsReducer } from "./systemsReducer";

export const rootReducer = combineReducers({
  authReducer,
  systemReducer,
  systemsReducer,
});
