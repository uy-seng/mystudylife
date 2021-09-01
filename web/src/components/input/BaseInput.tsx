import React from "react";
import { Field as FormikInput } from "formik";
import {
  BaseInputFieldProps,
  BaseInputFormikField,
  BaseInputLabelProps,
  BaseInputProps,
  BaseInputSubcomponents,
} from "../types/input";

const Label: React.FC<BaseInputLabelProps> = ({
  htmlFor,
  text,
  className,
  style,
}) => {
  return (
    <label className={className} style={style} htmlFor={htmlFor}>
      {text}
    </label>
  );
};

const Field: React.FC<BaseInputFieldProps> = ({
  id,
  type,
  className,
  style,
  onFocus = () => {},
}) => {
  return (
    <input
      onFocus={onFocus}
      className={className}
      style={style}
      id={id}
      type={type}
    />
  );
};

const FormikField: React.FC<BaseInputFormikField> = ({
  id,
  type,
  className,
  style,
  onFocus = () => {},
  name,
}) => {
  return (
    <FormikInput
      name={name}
      onFocus={onFocus}
      className={className}
      style={style}
      id={id}
      type={type}
    />
  );
};

const BaseInput: React.FC<BaseInputProps> & BaseInputSubcomponents = (
  props
) => {
  return <div {...props}>{props.children}</div>;
};
BaseInput.Label = Label;
BaseInput.Field = Field;
BaseInput.FormikField = FormikField;

export default BaseInput;
