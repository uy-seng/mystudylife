import React from "react";
import { BaseButton } from "./BaseButton";
import { BaseButtonProps } from "../types/button";
import css from "./button.module.css";

type type = "primary" | "secondary";
interface Props extends BaseButtonProps {
  type: type;
}

export const Button: React.FC<Props> = ({
  text,
  type,
  className = "",
  style,
  onClick,
}) => {
  return (
    <BaseButton
      onClick={onClick}
      className={className.concat(` ${css[type]}`)}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
      text={text}
    />
  );
};
