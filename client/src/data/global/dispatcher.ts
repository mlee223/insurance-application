import { useMemo } from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { ApplicationActions } from "./actions";
import { IApplicationData } from "../../types";

export const Dispatcher = (dispatch: Dispatch<any>) => ({
  application: {
    retrieve: (id: string) =>
      dispatch(ApplicationActions.getApplication({ id })),
    create: (data: IApplicationData) =>
      dispatch(ApplicationActions.createApplication({ data })),
    update: (data: IApplicationData) =>
      dispatch(ApplicationActions.updateApplication({ data })),
    validate: (id: string) =>
      dispatch(ApplicationActions.validateApplication({ id })),
  },
});

export const useDispatcher = () => {
  const dispatch = useDispatch();
  return {
    dispatcher: useMemo(() => Dispatcher(dispatch), [dispatch]),
    dispatch,
  };
};
