import { IRootState } from "../../../types";

export const ApplicationSelectors = {
  isFetching: (s: IRootState) => s.application.isFetching,
  isSubmitted: (s: IRootState) => s.application.isSubmitted,
  isValidated: (s: IRootState) => s.application.isValidated,
  priceQuote: (s: IRootState) => s.application.priceQuote,
  application: (s: IRootState) => s.application.data,
  error: (s: IRootState) => s.application.error,
};
