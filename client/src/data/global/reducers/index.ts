import { combineReducers, Reducer } from "redux";
import { InitialState } from "../state";
import { ApplicationReducer } from "./application.reducer";
import { TRootAction } from "../actions";
import { IRootState } from "../../../types";

export * from "./application.reducer";

const DataReducer = combineReducers<IRootState>({
  application: ApplicationReducer,
});

export const RootReducer: Reducer<IRootState> = (
  state: IRootState = InitialState,
  action: TRootAction
) => {
  const finalState = DataReducer(state, action);
  return finalState;
};
