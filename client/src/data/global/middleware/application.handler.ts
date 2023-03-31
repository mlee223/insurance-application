import { Dispatch, Middleware } from "redux";
import { getType } from "typesafe-actions";
import { ApiProvider } from "../../api";
import { IRootState } from "../../../types";
import { TRootAction, ApplicationActions } from "../actions";

const tryLoadApplication = async (
  state: IRootState,
  dispatch: Dispatch<TRootAction>,
  applicationId: string
) => {
  const api = ApiProvider(state, dispatch);

  if (api) {
    const response = await api.retrieveApplication(applicationId);
    const data = response;
    if (data) {
      dispatch(ApplicationActions.applicationReceived({ data }));
    } else {
    }
  } else {
    console.warn("not loading application");
  }
};

export const ApplicationMiddleware: Middleware<
  Dispatch<TRootAction>,
  IRootState,
  Dispatch<TRootAction>
> =
  ({ dispatch, getState }) =>
  (next: Dispatch<TRootAction>) =>
  (action: TRootAction) => {
    try {
      const prevState = getState();
      const result = next(action);

      switch (action.type) {
        case getType(ApplicationActions.getApplication): {
          tryLoadApplication(prevState, dispatch, action.payload.id);
          break;
        }
      }

      return result;
    } catch (err) {
      console.error(
        "application middleware :: Caught an exception for action ",
        action,
        err
      );
    }
  };
