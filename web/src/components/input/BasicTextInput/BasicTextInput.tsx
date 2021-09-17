import React from "react";

import BaseInput from "../BaseInput";
import { BasicTextInputProps } from "../../types/input";

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
        <BaseInput.Field style={{ width: "100%" }} {...props} />
      </div>
    </BaseInput>
  );
};
