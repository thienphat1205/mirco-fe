import { getEnv } from "@/utils/utils";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { createReducer } from "./reducers";

const ENV = getEnv();

export default function configureStore() {
  const composeEnhancers =
    ENV === "LOCAL" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  const enhancer = composeEnhancers(applyMiddleware(thunk));
  const store = createStore(createReducer(), enhancer);

  store.asyncReducers = {};

  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
  };
  return store;
}

export const store = configureStore();
