import React from "react";
import { v4 as uuidv4 } from "uuid";
import { BaseSelectProps } from "../types/select";

export const BaseSelect: React.FC<BaseSelectProps> = ({
  label,
  options,
  className,
  ...props
}) => {
  const id = uuidv4();
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <label htmlFor={`select_${id}`}>{label}</label>
      <select {...props}>
        {options.map((option) => (
          <option value={option.value}>{option.key}</option>
        ))}
      </select>
    </div>
  );
};
