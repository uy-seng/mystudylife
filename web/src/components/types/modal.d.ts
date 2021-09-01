import * as CSS from "csstype";

export interface BaseModalProps {
  className?: string;
  style?: CSS.Properties;
  show: boolean;
  parent: Element;
}

export interface BaseModalSubcomponents {
  Header: React.FC;
  Title: React.FC;
  Body: React.FC;
  Extra: React.FC;
}
