import React from "react";
import { BaseDividerProps } from "../types/divider";
import { BaseDivider } from "./BaseDivider";
import css from "./divider.module.css";

interface Props extends BaseDividerProps {
  label?: string;
}

export const Divider: React.FC<Props> = ({ className, style, label }) => {
  return (
    <BaseDivider style={style} className={className}>
      {label && <div className={css.label}>{label}</div>}
    </BaseDivider>
  );
};
