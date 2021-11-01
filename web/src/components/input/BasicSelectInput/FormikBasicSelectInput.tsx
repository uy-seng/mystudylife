import { Field } from "formik";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import css from "./FormikBasicSelectInput.module.css";

interface Option {
  key: any;
  value: any;
  label: string;
}

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options?: Option[];
  defaultValue?: any;
}

export const FormikBasicSelectInput: React.FC<Props> = ({
  label,
  name,
  options,
  children,
  defaultValue,
  ...props
}) => {
  const id = uuidv4();
  const [focused, setFocused] = React.useState(false);

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div
        style={{
          border: focused ? "1px solid var(--primary)" : "1px solid #e3e3e3",
          marginTop: "0.5rem",
        }}
      >
        <Field
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={css.select}
          as="select"
          name={name}
          {...props}
        >
          {options?.map((option) => (
            <option
              selected={defaultValue === option.value}
              value={option.value}
              key={option.key}
            >
              {option.label}
            </option>
          ))}
        </Field>
        {children}
      </div>
    </div>
  );
};
