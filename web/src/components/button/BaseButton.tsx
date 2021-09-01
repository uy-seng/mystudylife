import React from "react";
import { BaseButtonProps } from "../types/button";
import css from "./button.module.css";

export const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  text,
  style,
  className = "",
  onClick = () => {},
  as = "submit",
}) => {
  return (
    <button
      type={as}
      onClick={onClick}
      style={style}
      className={className.concat(` ${css.btn}`)}
    >
      <div className={css.wrapper}>
        {children}
        <div className={css.label}>{text}</div>
      </div>
    </button>
  );
};
