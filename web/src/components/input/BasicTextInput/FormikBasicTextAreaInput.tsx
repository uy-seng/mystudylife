import React from "react";
import { Field } from "formik";

import BaseInput from "../BaseInput";
import { FormikBasicTextInputProps } from "../../types/input";

import css from "./BasicTextInput.module.css";
import { v4 } from "uuid";

export const FormikBasicTextAreaInput: React.FC<FormikBasicTextInputProps> = ({
  label,
  className,
  style,
  name,
  validate,
  onChange,
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
          as="textarea"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.scrollHeight > e.target.clientHeight) {
              e.target.style.height = e.target.scrollHeight + "px";
            }
            if (onChange) onChange(e);
          }}
          style={{
            width: "100%",
            resize: "none",
            outline: "none",
            border: "none",
            minHeight: "100px",
          }}
          {...props}
        />
      </div>
    </BaseInput>
  );
};
