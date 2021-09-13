import React from "react";
import { BasicTextInputProps } from "../types/input";
import BaseInput from "./BaseInput";
import css from "./BasicTextInput.module.css";

export const BasicTextInput: React.FC<BasicTextInputProps> = ({
  label,
  className,
  style,
  ...props
}) => {
  if (className) className += ` ${css.input}`;
  else className = css.input;

  return (
    <BaseInput className={css.wrapper}>
      <BaseInput.Label className={css.label} text={label} />
      <div style={style} className={className}>
        <BaseInput.Field {...props} />
      </div>
    </BaseInput>
  );
};
