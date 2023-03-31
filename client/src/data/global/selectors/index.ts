import { useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { isEqual } from "lodash";
import { IRootState } from "../../../types";

export * from "./application.selectors";

export const createDeepSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
);
// export const createDeepArraySelector = createSelectorCreator(defaultMemoize, isArrayEqual);

export const rootSelector = (state: IRootState) => state;
export const useStateSelector = <T>(sel: (state: IRootState) => T) =>
  useSelector<IRootState, T>(sel, isEqual);
