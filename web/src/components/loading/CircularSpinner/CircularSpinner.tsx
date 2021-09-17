import React from "react";
import css from "./CircularSpinner.module.css";

interface Props {
  width: string;
  height: string;
}

export const CircularSpinner: React.FC<Props> = ({ width, height }) => {
  return (
    <div
      style={{
        width: width,
        height: height,
      }}
      className={css.loader}
    />
  );
};
