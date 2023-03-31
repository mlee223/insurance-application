import { IRootState } from "../../../types";

export const ApplicationSelectors = {
  isFetching: (s: IRootState) => s.application.isFetching,
  application: (s: IRootState) => s.application.data,
};
