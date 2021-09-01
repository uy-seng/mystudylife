import React from "react";
import { Link } from "react-router-dom";
import { Button } from ".";
import { BaseButtonProps } from "../types/button";
import { BaseButton } from "./BaseButton";

interface Props extends BaseButtonProps {
  href: string;
  text: string;
}

export const LinkButton: React.FC<Props> = ({ href, text }) => {
  return (
    <Link
      style={{
        textDecoration: "none",
      }}
      to={href}
    >
      <Button
        style={{
          border: "2px solid var(--secondary)",
          height: "100%",
        }}
        type="primary"
        text={text}
      />
    </Link>
  );
};
