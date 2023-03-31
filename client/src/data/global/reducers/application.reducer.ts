import { getType } from "typesafe-actions";
import { IApplicationState } from "../../../types";
import { InitialState } from "../state";
import { ApplicationActions, TRootAction } from "../actions";

export const ApplicationReducer = (
  state = InitialState.application,
  action: TRootAction
): IApplicationState => {
  switch (action.type) {
    case getType(ApplicationActions.getApplication): {
      return {
        ...state,
        isFetching: true,
        data: undefined,
      };
    }

    case getType(ApplicationActions.applicationReceived): {
      const { data } = action.payload;
      return {
        ...state,
        isFetching: false,
        data,
      };
    }

    default:
      return state;
  }
};
