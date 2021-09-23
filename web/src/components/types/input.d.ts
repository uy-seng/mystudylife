import * as CSS from "csstype";
import { FieldAttributes } from "formik";

export interface BaseInputProps
  extends React.AllHTMLAttributes<HTMLDivElement> {}

export interface BaseInputLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  text: string | null;
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

export interface SelectInputProps extends BaseInputFieldProps {
  label: string;
  options: {
    key: string;
    value: string | undefined;
  }[];
  setState: (value: any) => void;
}

export interface DatepickerProps extends BasicTextInputProps {
  label: string;
  defaultValue?: string;
  dateHandler: (value: string) => void;
  rerender?: number;
}

export interface FormikBasicTextInputProps extends BasicTextInputProps {
  name: string;
  validate?: (value: string) => string | null;
}

export interface FormikDatepickerProps extends DatepickerProps {
  name: string;
  validate?: (value: string) => string | null;
}
