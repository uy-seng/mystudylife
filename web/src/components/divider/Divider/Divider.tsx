import React from "react";

import { BaseDivider } from "../BaseDivider";
import { DividerProps } from "../../types/divider";

import css from "./Divider.module.css";

export const Divider: React.FC<DividerProps> = ({
  className,
  style,
  label,
}) => {
  return (
    <BaseDivider style={style} className={className}>
      {label && <div className={css.label}>{label}</div>}
    </BaseDivider>
  );
};
