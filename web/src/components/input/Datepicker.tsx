import React from "react";
import $ from "jquery";
import { v4 as uuidv4 } from "uuid";
import { BsCalendar } from "react-icons/bs";
import { CgDanger } from "react-icons/cg";

import BaseInput from "./BaseInput";
import { DatepickerProps } from "../types/input";

import css from "./Datepicker.module.css";
import "./jQueryDatepicker.css";

export const Datepicker: React.FC<DatepickerProps> = ({
  label,
  rerender,
  defaultValue,
  dateHandler,
  ...props
}) => {
  const [id] = React.useState<string>(uuidv4());
  const [error, setError] = React.useState<string>("");

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
          <BaseInput.Field
            {...props}
            defaultValue={defaultValue}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            onChange={(e) => {
              const date = e.currentTarget.value.split(" ");
              if (date && !isValidDate(date)) {
                const todayDate = new Date();
                setError(
                  `Invalid date. Must be in format ${
                    MONTH[todayDate.getMonth() + 1]
                  } ${todayDate.getDate()} ${todayDate.getFullYear()}. MM DD YYYY`
                );
              } else {
                setError("");
                dateHandler(e.currentTarget.value);
              }
            }}
            className={css.input}
            autoComplete="off"
            type="text"
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
        {error && (
          <div className={css.tooltip}>
            <CgDanger />
            <span className={css.tooltiptext}>{error}</span>
          </div>
        )}
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

const isValidMonth = (month: string): boolean => {
  if (MONTH.includes(month)) return true;
  return false;
};

const isValidDay = (day: string): boolean => {
  const _day = parseInt(day);
  const todayDate = new Date();
  const thisMonthLastday = new Date(
    todayDate.getFullYear(),
    todayDate.getMonth() + 1,
    0
  ).getDate();
  if (!isNaN(_day)) {
    if (_day > 0 && _day < thisMonthLastday) return true;
    return false;
  }
  return false;
};

const isValidYear = (month: string): boolean => {
  // regex to check the string contains 4 digit which is number
  const regex = new RegExp(/\d{4}$/);
  if (regex.test(month)) return true;
  return false;
};

const isValidDate = (date: string[]) => {
  if (date[0]) if (!isValidMonth(date[0])) return false;
  if (date[1]) if (!isValidDay(date[1])) return false;
  if (date[2]) if (!isValidYear(date[2])) return false;
  return true;
};

const MONTH = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
