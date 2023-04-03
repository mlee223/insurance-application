import { IApplicationData } from "./Application";

export interface IApplicationState {
  isFetching: boolean;
  data?: IApplicationData;
}

export interface IRootState {
  application: IApplicationState;
}
