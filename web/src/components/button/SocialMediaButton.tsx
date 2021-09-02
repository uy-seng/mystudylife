import React from "react";
import { Link } from "react-router-dom";
import { IconButton } from ".";
import { SocialMediaButtonProps } from "../types/button";
import css from "./button.module.css";

export const SocialMediaButton: React.FC<SocialMediaButtonProps> = ({
  to,
  ...props
}) => {
  return (
    <Link style={{ textDecoration: "none", width: "100%" }} to={to}>
      <IconButton children={<div className={css.divider} />} {...props} />
    </Link>
  );
};
