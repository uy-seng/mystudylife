import React from "react";
import {
  BaseInputFieldProps,
  BaseInputLabelProps,
  BaseInputProps,
  BaseInputSubcomponents,
} from "../types/input";

const Label: React.FC<BaseInputLabelProps> = ({ text, children, ...props }) => {
  return (
    <label {...props}>
      {text}
      {children}
    </label>
  );
};

const Field: React.FC<BaseInputFieldProps> = ({ ...props }) => {
  return <input {...props} />;
};

const BaseInput: React.FC<BaseInputProps> & BaseInputSubcomponents = (
  props
) => {
  return <div {...props}>{props.children}</div>;
};
BaseInput.Label = Label;
BaseInput.Field = Field;

export default BaseInput;
