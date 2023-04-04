import { ActionType, createAction } from "typesafe-actions";
import { IApplicationData } from "../../../types/Application";

export const APPLICATION_RETRIEVE_REQUEST =
  "@data/application/RETRIEVE_REQUEST";
export const APPLICATION_RETRIEVE_SUCCESS =
  "@data/application/RETRIEVE_SUCCESS";

export const APPLICATION_CREATE_REQUEST = "@data/application/CREATE_REQUEST";
export const APPLICATION_CREATE_SUCCESS = "@data/application/CREATE_SUCCESS";

export const APPLICATION_UPDATE_REQUEST = "@data/application/UPDATE_REQUEST";
export const APPLICATION_UPDATE_SUCCESS = "@data/application/UPDATE_SUCCESS";

export const APPLICATION_VALIDATE_REQUEST =
  "@data/application/VALIDATE_REQUEST";
export const APPLICATION_VALIDATE_SUCCESS =
  "@data/application/VALIDATE_SUCCESS";

export const APPLICATION_REQUEST_FAILURE = "@data/application/REQUEST_FAILURE";

export const ApplicationActions = {
  getApplication: createAction(APPLICATION_RETRIEVE_REQUEST)<{
    id: string;
  }>(),
  applicationReceived: createAction(APPLICATION_RETRIEVE_SUCCESS)<{
    data: IApplicationData;
  }>(),

  createApplication: createAction(APPLICATION_CREATE_REQUEST)<{
    data: IApplicationData;
  }>(),
  applicationCreated: createAction(APPLICATION_CREATE_SUCCESS)<{
    redirect: URL;
  }>(),

  updateApplication: createAction(APPLICATION_UPDATE_REQUEST)<{
    data: IApplicationData;
  }>(),
  applicationUpdated: createAction(APPLICATION_UPDATE_SUCCESS)(),

  validateApplication: createAction(APPLICATION_VALIDATE_REQUEST)<{
    id: string;
  }>(),
  applicationValidated: createAction(APPLICATION_VALIDATE_SUCCESS)<{
    price: number;
  }>(),

  applicationError: createAction(APPLICATION_REQUEST_FAILURE)<{
    error: string;
  }>(),
};

export type ApplicationActionType = ActionType<typeof ApplicationActions>;
