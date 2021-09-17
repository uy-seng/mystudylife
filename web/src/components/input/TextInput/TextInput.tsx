import React from "react";
import { v4 as uuidv4 } from "uuid";

import BaseInput from "../BaseInput";
import { TextInputProps } from "../../types/input";

import css from "./TextInput.module.css";

export const TextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
  const id = uuidv4();
  return (
    <BaseInput className={css.wrapper}>
      <BaseInput.Label className={css.label} htmlFor={id} text={label} />
      <BaseInput.Field
        {...props}
        onFocus={onFocusHandler}
        className={css.input}
        id={id}
        type="text"
      />
    </BaseInput>
  );
};

const onFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
  const label: HTMLElement = e.currentTarget
    .previousElementSibling as HTMLElement;
  if (!label.classList.contains(css.focus)) {
    label.classList.add(css.focus);
  }
};
