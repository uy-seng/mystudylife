import { Field } from "formik";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import css from "./Timepicker.module.css";

interface Props {
  name: string;
  label: string;
}

export const FormikTimepicker: React.FC<Props> = ({ name, label }) => {
  const id = uuidv4();
  return (
    <div className={css.wrapper}>
      <label htmlFor={id}>{label}</label>
      <Field className={css.input} type="time" name={name} id={id} />
    </div>
  );
};
