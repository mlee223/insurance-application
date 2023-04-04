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
        isSubmitted: false,
        isValidated: false,
        priceQuote: undefined,
        data: undefined,
        error: undefined,
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

    case getType(ApplicationActions.updateApplication): {
      const { data } = action.payload;
      return {
        ...state,
        isSubmitted: false,
        isValidated: false,
        priceQuote: undefined,
        data,
        error: undefined,
      };
    }
    case getType(ApplicationActions.applicationUpdated): {
      return {
        ...state,
        isSubmitted: true,
      };
    }

    case getType(ApplicationActions.validateApplication): {
      return {
        ...state,
        isValidated: false,
        priceQuote: undefined,
        error: undefined,
      };
    }
    case getType(ApplicationActions.applicationValidated): {
      const { price } = action.payload;
      return {
        ...state,
        isValidated: true,
        priceQuote: price,
      };
    }

    case getType(ApplicationActions.applicationError): {
      const { error } = action.payload;
      return {
        ...state,
        error,
      };
    }

    default:
      return state;
  }
};
