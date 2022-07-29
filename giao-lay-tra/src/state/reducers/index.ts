import { combineReducers } from "redux";
import userReducer from "./userReducer";
import metaDataReducer from "./metaDataReducer";

const rootReducer = combineReducers({
  user: userReducer,
  metaData: metaDataReducer,
});

export function createReducer(asyncReducers: any) {
  return combineReducers({
    user: userReducer,
    metaData: metaDataReducer,
    ...asyncReducers,
  });
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
