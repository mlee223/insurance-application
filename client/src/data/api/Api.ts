import { Dispatch } from "react";
import { IApplicationData, IRootState } from "../../types";
import { TRootAction } from "../global/actions";
import { ApiClient } from "./ApiClient";

const httpOptions = {
  headers: { Accept: "application/json" },
};

export function Api(api: ApiClient) {
  return {
    createApplication: async (
      data: IApplicationData
    ): Promise<{ redirect: string }> => {
      return api.post("applications", data, httpOptions);
    },
    retrieveApplication: async (id: string): Promise<IApplicationData> => {
      return api.get(`/applications/${id}`, {}, httpOptions);
    },
    updateApplication: async (
      data: IApplicationData
    ): Promise<{ success: boolean }> => {
      return api.put(`/applications/${data.id}`, data, httpOptions);
    },
    validateApplication: async (
      data: IApplicationData
    ): Promise<{ price: number }> => {
      return api.post(`/applications/${data.id}`, {}, httpOptions);
    },
  };
}

export const ApiProvider = (
  state: IRootState,
  dispatch: Dispatch<TRootAction>,
  errAction?: (error: any) => TRootAction
) => {
  return Api(
    new ApiClient().withResponseHandler({
      onResponse: (resp: any) => {
        return resp;
      },
      onResponseError: (error: any) => {
        if (errAction) {
          dispatch(errAction({ error }));
          return error;
        }
      },
    })
  );
};

export type TApiProvider = ReturnType<typeof ApiProvider>;
