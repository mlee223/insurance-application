import { DateTime } from "luxon";

export const DateConstant = {
  DOB_MAX: DateTime.now().plus({ years: -16 }),
  DOB_MIN: DateTime.now().plus({ years: -70 }),
  VEHICLE_MAX: DateTime.now().plus({ years: +1 }),
  VEHICLE_MIN: DateTime.fromObject({ year: 1985 }),
  MS: {
    seconds: 1000,
    minutes: 60 * 1000,
    hours: 60 * 60 * 1000,
  },
};
