import React from "react";
import { UseFormRegister } from "react-hook-form";

interface ICustomTextInputProps {
  type?: string;
  label: string;
  name: string;
  required: boolean;
  error?: string;
  register: UseFormRegister<any>;
}

export const CustomTextInput: React.FC<ICustomTextInputProps> = ({
  type,
  label,
  name,
  required,
  error,
  register,
}) => {
  return (
    <div className="form-element">
      <label>{`${label}${required ? "*" : ""}`}</label>
      <input
        className="form-control"
        type={type}
        {...register(name, { required })}
      />
      <p className="form-error">{error || ""}</p>
    </div>
  );
};
