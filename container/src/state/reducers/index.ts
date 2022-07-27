import { combineReducers } from "redux";
import userReducer from "./userReducer";
import metaDataReducer from "./metaDataReducer";
import commonReducer from "./commonReducer";

const rootReducer = combineReducers({
  user: userReducer,
  metaData: metaDataReducer,
  commonReducer,
});

export function createReducer(asyncReducers: any) {
  return combineReducers({
    user: userReducer,
    metaData: metaDataReducer,
    commonReducer,
    ...asyncReducers,
  });
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
