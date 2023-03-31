import { ActionType } from "typesafe-actions";
import { ApplicationActions } from "./application.actions";

export * from "./application.actions";

export const Actions = {
  ...ApplicationActions,
};
export type TRootAction = ActionType<typeof Actions>;
