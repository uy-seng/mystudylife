import React from "react";
import { IconButton } from ".";
import { SocialMediaButtonProps } from "../types/button";
import css from "./button.module.css";

export const SocialMediaButton: React.FC<SocialMediaButtonProps> = ({
  href,
  ...props
}) => {
  return (
    <a style={{ textDecoration: "none", width: "100%" }} href={href}>
      <IconButton children={<div className={css.divider} />} {...props} />
    </a>
  );
};
