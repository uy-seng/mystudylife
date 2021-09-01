import React from "react";
import BaseInput from "./BaseInput";
import { v4 as uuidv4 } from "uuid";
import css from "./TextInput.module.css";
import * as CSS from "csstype";

interface Props {
  label: string;
  name: string;
  style?: CSS.Properties;
}

export const FormikTextInput: React.FC<Props> = ({ name, label, style }) => {
  const id = uuidv4();
  return (
    <BaseInput className={css.wrapper}>
      <BaseInput.Label className={css.label} htmlFor={id} text={label} />
      <BaseInput.FormikField
        name={name}
        style={style}
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
