import React from "react";
import { Link } from "react-router-dom";
import { Button } from ".";
import { ButtonProps, LinkButtonProps } from "../types/button";

export const LinkButton: React.FC<LinkButtonProps & ButtonProps> = ({
  to,
  ...props
}) => {
  return (
    <Link
      style={{
        width: "100%",
        textDecoration: "none",
      }}
      to={to}
    >
      <Button {...props} />
    </Link>
  );
};
