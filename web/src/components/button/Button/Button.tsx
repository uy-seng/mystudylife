import React from "react";

import { BaseButton } from "../BaseButton";
import { ButtonProps } from "../../types/button";

import baseButtonCSS from "../BaseButton.module.css";
import css from "./Button.module.css";

export const Button: React.FC<ButtonProps> = ({
  as,
  text,
  className,
  ...props
}) => {
  return (
    <BaseButton
      className={
        className
          ? className.concat(` ${baseButtonCSS[as]} ${css.btn}`)
          : ` ${baseButtonCSS[as]} ${css.btn}`
      }
      text={text}
      {...props}
    />
  );
};
