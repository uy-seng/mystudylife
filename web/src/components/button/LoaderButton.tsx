import React from "react";
import { CircularSpinner } from "../loading";
import { LoaderButtonProps } from "../types/button";
import { Button } from "./Button";

export const LoaderButton: React.FC<LoaderButtonProps> = ({
  loading,
  text,
  ...props
}) => {
  return (
    <Button
      style={{
        padding: "0.5rem 1rem",
      }}
      {...props}
      text={loading ? null : text}
      children={loading ? <CircularSpinner width="1rem" height="1rem" /> : null}
    />
  );
};
