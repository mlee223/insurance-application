import { createStore, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import _ from "lodash";
import { setupMiddleware } from "./middleware/index";
import { RootReducer } from "./reducers";

export const DataStore = (options: { enableDevTools: boolean }) => {
  const composeEnhancers = options.enableDevTools
    ? composeWithDevTools({
        predicate: (state, action) =>
          _.get(action, "meta.verbose", false) !== true,
      })
    : compose;
  const { middleware } = setupMiddleware();
  const storeVal = createStore(RootReducer, composeEnhancers(middleware));

  return storeVal;
};
