import React, { useState, useCallback } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IApplicationData } from "../types/Application";
import { CustomTextInput } from "../components/CustomTextInput";
import { useDispatcher } from "../data/global/dispatcher";
import { ApplicationValidationSchema } from "./validators";

export interface IApplicationFormProps {
  data: IApplicationData;
}

const ApplicationForm: React.FC<IApplicationFormProps> = ({ data }) => {
  const { dispatcher } = useDispatcher();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: { ...data },
    resolver: yupResolver(ApplicationValidationSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "vehicles",
  });

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const onSubmit = useCallback(
    (data: any) => {
      setFormSubmitted(false);
      dispatcher.application.update(data);
    },
    [dispatcher, setFormSubmitted]
  );

  return (
    <div className="submit-form">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <CustomTextInput
              label="First Name"
              name="firstName"
              register={register}
              required
              error={errors.firstName?.message}
            />
            <CustomTextInput
              label="Last Name"
              name="lastName"
              register={register}
              required
              error={errors.lastName?.message}
            />
          </div>

          <div className="form-row">
            <CustomTextInput
              label="Birth Date"
              name="birthDate"
              register={register}
              required
              error={errors.birthDate?.message}
            />
          </div>

          <div className="form-row">
            <CustomTextInput
              label="Street"
              name="address.street"
              register={register}
              required
              error={errors.address?.street?.message}
            />
            <CustomTextInput
              label="City"
              name="address.city"
              register={register}
              required
              error={errors.address?.city?.message}
            />
            <CustomTextInput
              label="State"
              name="address.state"
              register={register}
              required
              error={errors.address?.state?.message}
            />
            <CustomTextInput
              label="ZIP Code"
              name="address.zipCode"
              register={register}
              required
              error={errors.address?.zipCode?.message}
            />
          </div>

          {fields.map((vehicle, idx) => (
            <div key={vehicle.id} className="form-row">
              <CustomTextInput
                label="VIN"
                name={`vehicles.${idx}.vin`}
                register={register}
                required
                error={
                  errors.vehicles ? errors.vehicles[idx]?.vin?.message : ""
                }
              />
              <CustomTextInput
                label="Year"
                name={`vehicles.${idx}.year`}
                register={register}
                required
                error={
                  errors.vehicles ? errors.vehicles[idx]?.year?.message : ""
                }
              />
              <CustomTextInput
                label="Make and Model"
                name={`vehicles.${idx}.model`}
                register={register}
                required
                error={
                  errors.vehicles ? errors.vehicles[idx]?.model?.message : ""
                }
              />
            </div>
          ))}

          <input type="submit" />
        </form>
        {Object.keys(errors).length === 0 && formSubmitted && (
          <p className="form-message">You submitted successfully!</p>
        )}
      </div>
    </div>
  );
};

export default ApplicationForm;