import * as CSS from "csstype";

type as = "submit" | "reset" | "button";
export interface BaseButtonProps {
  text: string;
  style?: CSS.Properties;
  className?: string;
  onClick?: (e) => void;
  as?: as;
}

export interface IconButtonProps extends BaseButtonProps {
  icon: React.ReactNode;
}
