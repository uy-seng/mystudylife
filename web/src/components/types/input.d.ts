import * as CSS from "csstype";

export interface BaseInputProps {
  className?: string;
  style?: CSS.Properties;
}

export interface BaseInputLabelProps extends BaseInputProps {
  text: string;
  htmlFor: string;
}

export interface BaseInputFieldProps extends BaseInputProps {
  type: string;
  id: string;
  onFocus: (e) => void;
}

export interface BaseInputFormikField extends BaseInputFieldProps {
  name: string;
}

export interface BaseInputSubcomponents {
  Label: React.FC<BaseInputLabelProps>;
  Field: React.FC<BaseInputFieldProps>;
  FormikField: React.FC<BaseInputFormikField>;
}
