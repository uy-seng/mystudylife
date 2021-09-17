import React from "react";

import { IconButton } from "..";
import { SocialMediaButtonProps } from "../../types/button";

import css from "./SocialMediaButton.module.css";

export const SocialMediaButton: React.FC<SocialMediaButtonProps> = ({
  href,
  ...props
}) => {
  return (
    <a className={css.link} href={href}>
      <IconButton children={<div className={css.divider} />} {...props} />
    </a>
  );
};
