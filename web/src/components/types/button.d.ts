import * as CSS from "csstype";

export interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string | null;
}

type as = "primary" | "secondary";
export interface ButtonProps extends BaseButtonProps {
  as: as;
}
export interface IconButtonProps extends BaseButtonProps {
  icon: React.ReactNode;
}

export interface LinkButtonProps extends BaseButtonProps {
  to: string;
}
export interface SocialMediaButtonProps extends IconButtonProps {
  href: string;
}

export interface LoaderButtonProps extends ButtonProps {
  loading: boolean;
}
