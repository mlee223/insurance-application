import Vehicle from "./Vehicle";

export default interface IApplicationData {
  id?: any | null;
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  vehicle: Vehicle[];
  published?: boolean;
}
