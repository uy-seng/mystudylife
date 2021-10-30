import React from "react";

import { BaseSelect } from "../BaseSelect";
import { BasicSelectProps } from "../../types/select";

import css from "./BasicSelect.module.css";

export const BasicSelect: React.FC<BasicSelectProps> = ({
  label,
  options,
  ...props
}) => {
  return (
    <BaseSelect
      className={css.main}
      label={label}
      options={options}
      {...props}
    />
  );
};
