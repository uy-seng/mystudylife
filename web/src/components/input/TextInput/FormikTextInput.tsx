import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Field } from "formik";

import { FormikInputProps } from "../../types/input";
import BaseInput from "../BaseInput";

import css from "./TextInput.module.css";

export const FormikTextInput: React.FC<FormikInputProps> = ({
  label,
  name,
  error = null,
  value,
  ...props
}) => {
  const id = uuidv4();

  React.useEffect(() => {
    const label: HTMLElement = document.getElementById(id)
      ?.previousElementSibling as HTMLElement;
    if (error) {
      if (!label.classList.contains(css.error)) label.classList.add(css.error);
    } else {
      if (label.classList.contains(css.error))
        label.classList.remove(css.error);
    }
  }, [error, id]);

  return (
    <BaseInput onBlur={onBlurHandler} className={css.wrapper}>
      <BaseInput.Label className={css.label} htmlFor={id} text={label} />
      <Field
        autoComplete={name}
        id={id}
        className={css.input}
        onFocus={onFocusHandler}
        name={name}
        {...props}
      />
      {error}
    </BaseInput>
  );
};

const onFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
  const label: HTMLElement = e.currentTarget
    .previousElementSibling as HTMLElement;
  if (!label.classList.contains(css.touched)) {
    label.classList.add(css.touched);
  }
  label.classList.toggle(css.focus);
};

const onBlurHandler = (e: React.FocusEvent<HTMLDivElement>) => {
  const label: HTMLElement = e.currentTarget.firstElementChild as HTMLElement;
  label.classList.toggle(css.focus);
};
