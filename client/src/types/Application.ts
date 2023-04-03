import IAddressData from "./Address";
import IVehicleData from "./Vehicle";

export interface IApplicationData {
  id?: any | null;
  firstName: string;
  lastName: string;
  birthDate: string;
  address: IAddressData;
  vehicles: IVehicleData[];
  published?: boolean;
}
