import React from "react";
import { BaseButton } from "./BaseButton";
import { ButtonProps } from "../types/button";
import css from "./button.module.css";

export const Button: React.FC<ButtonProps> = ({
  as,
  text,
  style,
  className,
  ...props
}) => {
  return (
    <BaseButton
      {...props}
      className={className ? className.concat(` ${css[as]}`) : css[as]}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
      text={text}
    />
  );
};
