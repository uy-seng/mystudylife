import React from "react";

import { BaseButton } from "../BaseButton";
import { IconButtonProps } from "../../types/button";

import css from "./IconButton.module.css";

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  text,
  children,
  ...props
}) => {
  return (
    <BaseButton
      className={css.btn}
      text={text}
      children={
        <React.Fragment>
          <div className={css.icon}>{icon}</div>
          {children}
        </React.Fragment>
      }
      {...props}
    />
  );
};
