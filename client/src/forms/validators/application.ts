import * as yup from "yup";
import { parse, isDate } from "date-fns";
import { DateConstant, NumberConstant } from "../../constants";

const patternAlpha = /^[a-zA-Z\s]*$/;
const patternAlphabet = /^[a-zA-Z0-9]+$/;
const patternDate = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
const patternAddress = /^[a-zA-Z0-9\s,'-]*$/;
const patternZIP = /^[0-9]{5}(?:-[0-9]{4})?$/;

const stringValidator = (pattern: RegExp, message: string) =>
  yup.string().matches(pattern, message);

const dateValidator = (
  min: string,
  minMsg: string,
  max: string,
  maxMsg: string
) =>
  yup
    .date()
    .transform((_, originalValue) =>
      isDate(originalValue)
        ? originalValue
        : parse(originalValue, "yyyy-MM-dd", new Date())
    )
    .min(min, minMsg)
    .max(max, maxMsg);

const NAME_L_MIN_MSG = `Must be at least ${NumberConstant.NAME_L_MIN} characters`;
const NAME_L_MAX_MSG = `Must be at most ${NumberConstant.NAME_L_MAX} characters`;
const VEHICLE_MIN_MSG = `Must be later than ${DateConstant.VEHICLE_MIN.year}`;
const VEHICLE_MAX_MSG = `Must be at earlier than ${DateConstant.VEHICLE_MAX.year}`;

export const ApplicationValidationSchema = yup.object().shape({
  firstName: stringValidator(patternAlpha, "Must include only letter")
    .min(NumberConstant.NAME_L_MIN, NAME_L_MIN_MSG)
    .max(NumberConstant.NAME_L_MAX, NAME_L_MAX_MSG)
    .required("Enter a first name"),

  lastName: stringValidator(patternAlpha, "Must include only letter")
    .min(NumberConstant.NAME_L_MIN, NAME_L_MIN_MSG)
    .max(NumberConstant.NAME_L_MAX, NAME_L_MAX_MSG)
    .required("Enter a last name"),

  birthDate: dateValidator(
    DateConstant.DOB_MIN.toISODate(),
    "",
    DateConstant.DOB_MAX.toISODate(),
    "Must be older than 16"
  ),

  address: yup.object().shape({
    street: stringValidator(patternAddress, "Invalid street").required(
      "Enter a valid street"
    ),
    city: stringValidator(patternAddress, "Invalid city").required(
      "Enter a valid city"
    ),
    state: stringValidator(patternAddress, "Invalid state").required(
      "Enter a valid state"
    ),
    zipCode: stringValidator(patternZIP, "Invalid ZIP code").required(
      "Enter a valid ZIP code"
    ),
  }),

  vehicles: yup
    .array()
    .of(
      yup.object().shape({
        vin: stringValidator(patternAlphabet, "Invalid VIN number").required(
          "Enter a valid VIN number"
        ),

        // year: dateValidator(
        //   DateConstant.VEHICLE_MIN.toISODate(),
        //   VEHICLE_MIN_MSG,
        //   DateConstant.VEHICLE_MAX.toISODate(),
        //   VEHICLE_MAX_MSG
        // ).required("Enter a valid year"),
        year: yup
          .number()
          .typeError("Invalid data")
          .test("len", "Must be exactly 4 characters", (val) =>
            val ? val.toString().length === 4 : false
          )
          .min(DateConstant.VEHICLE_MIN.year, VEHICLE_MIN_MSG)
          .max(DateConstant.VEHICLE_MAX.year, VEHICLE_MAX_MSG)
          .required("Enter a valid year"),

        model: stringValidator(
          patternAlphabet,
          "Invalid Make and Model"
        ).required("Enter a valid Make and Model"),
      })
    )
    .min(1)
    .max(3, "Cannot have more than 3 total")
    .required(),
});
