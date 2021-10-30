import React from "react";
import { v4 as uuidv4 } from "uuid";
import css from "./Timepicker.module.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export const Timepicker: React.FC<Props> = ({ name, label, ...props }) => {
  const id = uuidv4();
  return (
    <div className={css.wrapper}>
      <label htmlFor={id}>{label}</label>
      <input {...props} className={css.input} type="time" name={name} id={id} />
    </div>
  );
};
