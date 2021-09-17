import React from "react";
import { Link } from "react-router-dom";

import { Button } from "..";
import { ButtonProps, LinkButtonProps } from "../../types/button";

import css from "./LinkButton.module.css";

export const LinkButton: React.FC<LinkButtonProps & ButtonProps> = ({
  to,
  ...props
}) => {
  return (
    <Link className={css.link} to={to}>
      <Button {...props} />
    </Link>
  );
};
