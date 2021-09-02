import React from "react";
import { BaseButtonProps } from "../types/button";
import css from "./button.module.css";

export const BaseButton: React.FC<BaseButtonProps> = ({
  text,
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={className ? className.concat(` ${css.btn}`) : css.btn}
      {...props}
    >
      <div className={css.wrapper}>
        {children}
        {text && <div className={css.label}>{text}</div>}
      </div>
    </button>
  );
};
