import React from "react";
import $ from "jquery";
import { v4 as uuidv4 } from "uuid";

import { BsCalendar } from "react-icons/bs";
import BaseInput from "./BaseInput";
import { FormikDatepickerProps } from "../types/input";
import { Field } from "formik";

import css from "./Datepicker.module.css";
import "./jQueryDatepicker.css";

export const FormikDatepicker: React.FC<FormikDatepickerProps> = ({
  label,
  name,
  rerender,
  defaultValue,
  validate,
  dateHandler,
  ...props
}) => {
  const [id] = React.useState<string>(uuidv4());

  React.useLayoutEffect(() => {
    $(`#datepicker_input_${id}`).datepicker({
      beforeShow: (): any => {
        $(`#datepicker_${id}`).append($("#ui-datepicker-div"));
      },
      dateFormat: "MM dd yy",
      onSelect: (dateText) => {
        dateHandler(dateText);
      },
    });
    // add force rendering to prevent component coupling
  }, [id, rerender]);

  return (
    <BaseInput className={css.wrapper}>
      <BaseInput.Label
        text={label}
        className={css.label}
        htmlFor={`datepicker_${id}`}
      />
      <div className={css.content}>
        <div id={`datepicker_${id}`} className={css.datepicker}>
          <Field
            {...props}
            validate={validate}
            name={name}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            className={css.input}
            autoComplete="off"
            id={`datepicker_input_${id}`}
          />
          <BaseInput.Label
            text={null}
            className={css.calendar}
            htmlFor={`datepicker_input_${id}`}
          >
            <BsCalendar />
          </BaseInput.Label>
        </div>
      </div>
    </BaseInput>
  );
};

const onFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
  const parentElement = e.currentTarget.parentElement as HTMLElement;
  if (!parentElement.classList.contains(css.focused)) {
    parentElement.classList.add(css.focused);
  }

  const label = parentElement.parentElement!
    .previousElementSibling as HTMLElement;
  if (!label.classList.contains(css.focused)) {
    label.classList.add(css.focused);
  }
};

const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
  const parentElement = e.currentTarget.parentElement as HTMLElement;
  if (parentElement.classList.contains(css.focused)) {
    parentElement.classList.remove(css.focused);
  }

  const label = parentElement.parentElement!
    .previousElementSibling as HTMLElement;
  if (label.classList.contains(css.focused)) {
    label.classList.remove(css.focused);
  }
};
