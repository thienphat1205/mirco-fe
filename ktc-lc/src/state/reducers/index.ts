import { combineReducers } from "redux";
import userReducer from "./userReducer";
import metaDataReducer from "./metaDataReducer";

const rootReducer = combineReducers({
  user: userReducer,
  metaData: metaDataReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
