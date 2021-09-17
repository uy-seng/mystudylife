import * as CSS from "csstype";

export interface BaseDividerProps {
  className?: string;
  style?: CSS.Properties;
}

export interface DividerProps extends BaseDividerProps {
  label?: string;
}
