import * as CSS from "csstype";
import { FieldAttributes } from "formik";

export interface BaseInputProps
  extends React.AllHTMLAttributes<HTMLDivElement> {}

export interface BaseInputLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
}

export interface BaseInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface BaseInputSubcomponents {
  Label: React.FC<BaseInputLabelProps>;
  Field: React.FC<BaseInputFieldProps>;
}

export interface TextInputProps extends BaseInputFieldProps {
  label: string;
}

export interface FormikInputProps extends TextInputProps {
  name: string;
  error?: React.ReactNode | null;
}

export interface BasicTextInputProps extends BaseInputFieldProps {
  label: string;
}
