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

  const [focused, setFocused] = React.useState(false);

  return (
    <BaseInput className={css.wrapper}>
      <BaseInput.Label className={css.label} text={label} />
      <div
        style={{
          ...style,
          border: focused ? "1px solid var(--primary)" : "1px solid #e3e3e3",
        }}
        className={className}
      >
        <Field
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          validate={validate}
          name={name}
          style={{ width: "100%" }}
          {...props}
        />
      </div>
    </BaseInput>
  );
};
