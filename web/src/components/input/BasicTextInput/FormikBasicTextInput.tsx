import React from "react";
import { Field } from "formik";

import BaseInput from "../BaseInput";
import { FormikBasicTextInputProps } from "../../types/input";

import css from "./BasicTextInput.module.css";

export const FormikBasicTextInput: React.FC<FormikBasicTextInputProps> = ({
  label,
  className,
  style,
  name,
  validate,
  ...props
}) => {
  if (className) className += ` ${css.input}`;
  else className = css.input;

  return (
    <BaseInput className={css.wrapper}>
      <BaseInput.Label className={css.label} text={label} />
      <div style={style} className={className}>
        <Field
          validate={validate}
          name={name}
          style={{ width: "100%" }}
          {...props}
        />
      </div>
    </BaseInput>
  );
};
