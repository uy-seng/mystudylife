import React from "react";

import { Button } from "..";
import { CircularSpinner } from "../../loading";
import { LoaderButtonProps } from "../../types/button";

import css from "./LoaderButton.module.css";

export const LoaderButton: React.FC<LoaderButtonProps> = ({
  loading,
  text,
  ...props
}) => {
  return (
    <Button
      className={css.btn}
      text={loading ? null : text}
      children={loading ? <CircularSpinner width="1rem" height="1rem" /> : null}
      {...props}
    />
  );
};
