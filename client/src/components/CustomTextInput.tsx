import React, { ChangeEvent } from "react";

interface ICustomTextInputProps {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CustomTextInput: React.FC<ICustomTextInputProps> = ({
  id,
  label,
  name,
  value,
  onChange,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        className="form-control"
        id={id}
        required
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

export default CustomTextInput;
