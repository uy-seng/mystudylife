import React from "react";
import { BaseDividerProps } from "../types/divider";
import css from "./BaseDivider.module.css";

export const BaseDivider: React.FC<BaseDividerProps> = ({
  className = "",
  style,
  children,
}) => {
  return (
    <div className={className.concat(` ${css.divider}`)} style={style}>
      {children}
    </div>
  );
};
