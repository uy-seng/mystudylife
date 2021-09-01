import React from "react";
import { IconButton } from ".";
import { IconButtonProps } from "../types/button";
import css from "./button.module.css";

interface Props extends IconButtonProps {}

export const SocialMediaButton: React.FC<Props> = ({
  icon,
  text,
  className,
  onClick,
  style,
}) => {
  return (
    <IconButton
      children={<div className={css.divider} />}
      icon={icon}
      text={text}
      className={className}
      style={style}
      onClick={onClick}
    />
  );
};
