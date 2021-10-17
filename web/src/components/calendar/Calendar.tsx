import React from "react";
import css from "./Calendar.module.css";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MonthCalendar } from "./MonthCalendar";
import cx from "classnames";
import { WeekCalendar } from "./WeekCalendar";
interface Props {}

export const Calendar: React.FC<Props> = () => {
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());
  const [activeCalendar, setActiveCalendar] = React.useState<string>("month");

  return (
    <div className={css.calendar}>
      <div className={css.header}>
        <div className={css.left}>
          <div>
            <FaChevronLeft
              onClick={() => {
                setCurrentDate(() => {
                  const m = new Date(
                    currentDate.setMonth(currentDate.getMonth() - 1)
                  );
                  const d = new Date(m.setDate(1));
                  return d;
                });
              }}
            />
          </div>
          <div>
            {activeCalendar === "month" &&
              currentDate
                .toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
                .split(" ")
                .filter((e, index) => index !== 1)
                .join(" ")}
          </div>
          <div>
            <FaChevronRight
              onClick={() => {
                setCurrentDate(() => {
                  const m = new Date(
                    currentDate.setMonth(currentDate.getMonth() + 1)
                  );
                  const d = new Date(m.setDate(1));
                  return d;
                });
              }}
            />
          </div>
        </div>
        <div className={css.right}>
          <button
            onClick={() => setActiveCalendar("week")}
            className={cx(css.btn, activeCalendar === "week" && css.active)}
          >
            Week
          </button>
          <button
            onClick={() => setActiveCalendar("month")}
            className={cx(css.btn, activeCalendar === "month" && css.active)}
          >
            Month
          </button>
        </div>
      </div>
      {activeCalendar === "month" && (
        <MonthCalendar currentDate={currentDate} />
      )}
      {activeCalendar === "week" && <WeekCalendar currentDate={currentDate} />}
    </div>
  );
};
