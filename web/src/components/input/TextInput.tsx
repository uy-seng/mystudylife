import React from "react";
import BaseInput from "./BaseInput";
import { v4 as uuidv4 } from "uuid";
import css from "./TextInput.module.css";

interface Props {
  label: string;
}

export const TextInput: React.FC<Props> = ({ label }) => {
  const id = uuidv4();
  return (
    <BaseInput className={css.wrapper}>
      <BaseInput.Label className={css.label} htmlFor={id} text={label} />
      <BaseInput.Field
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
