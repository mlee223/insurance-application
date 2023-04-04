import { IApplicationData } from "./Application";

export interface IApplicationState {
  isFetching: boolean;
  isSubmitted?: boolean;
  isValidated?: boolean;
  priceQuote?: number;
  data?: IApplicationData;
  error?: string;
}

export interface IRootState {
  application: IApplicationState;
}
