import { combineReducers } from "redux";
import userReducer from "./userReducer";
import ticketReducer from "./ticketReducer";
import metaDataReducer from "./metaDataReducer";

const rootReducer = combineReducers({
  user: userReducer,
  ticket: ticketReducer,
  metaData: metaDataReducer,
});

export function createReducer(asyncReducers: any) {
  return combineReducers({
    user: userReducer,
    ticket: ticketReducer,
    metaData: metaDataReducer,
    ...asyncReducers,
  });
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
