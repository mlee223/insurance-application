import Vehicle from "./Vehicle";

export interface IApplicationData {
  id?: any | null;
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  vehicle: Vehicle[];
  published?: boolean;
}
