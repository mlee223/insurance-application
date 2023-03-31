import http from "./http-common";
import IApplicationData from "../types/Application";

const getAll = () => {
  return http.get<Array<IApplicationData>>("/applications");
};

const get = (id: any) => {
  return http.get<IApplicationData>(`/applications/${id}`);
};

const create = (data: IApplicationData) => {
  return http.post<IApplicationData>("/applications", data);
};

const update = (id: any, data: IApplicationData) => {
  return http.put<any>(`/applications/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/applications/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/applications`);
};

const findByTitle = (title: string) => {
  return http.get<Array<IApplicationData>>(`/applications?title=${title}`);
};

const ApplicationService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default ApplicationService;
