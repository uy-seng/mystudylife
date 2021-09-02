import React from "react";
import { IconButtonProps } from "../types/button";
import { BaseButton } from "./BaseButton";
import css from "./button.module.css";

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  text,
  style,
  children,
  ...props
}) => {
  return (
    <BaseButton
      {...props}
      text={text}
      children={
        <React.Fragment>
          <div className={css.icon}>{icon}</div>
          {children}
        </React.Fragment>
      }
      style={{
        padding: "0.5rem 1rem",
        ...style,
      }}
    />
  );
};
