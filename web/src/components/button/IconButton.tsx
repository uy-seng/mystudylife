import React from "react";
import { IconButtonProps } from "../types/button";
import { BaseButton } from "./BaseButton";
import css from "./button.module.css";

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  text,
  className,
  style,
  children,
  onClick,
  as,
}) => {
  return (
    <BaseButton
      as={as}
      onClick={onClick}
      text={text}
      children={
        <React.Fragment>
          <div className={css.icon}>{icon}</div>
          {children}
        </React.Fragment>
      }
      className={className}
      style={{
        padding: "0.5rem 1rem",
        ...style,
      }}
    />
  );
};
