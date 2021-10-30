import * as CSS from "csstype";

export interface BaseModalProps {
  className?: string;
  style?: CSS.Properties;
  show: boolean;
  parent: Element;
  hide?: () => void;
  ref?: LegacyRef<T> | undefined;
}

export interface BaseModalSubcomponents {
  Header: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  Title: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  Body: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  Extra: React.FC<React.HTMLAttributes<HTMLDivElement>>;
}
