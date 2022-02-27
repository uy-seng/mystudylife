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
            {activeCalendar === "month" && (
              <FaChevronLeft
                onClick={() => {
                  setCurrentDate(() => {
                    const oldDate = new Date();
                    const newMonth = new Date(
                      currentDate.setMonth(currentDate.getMonth() - 1)
                    );
                    let newDate = new Date(newMonth.setDate(1));
                    if (
                      newDate.getFullYear() === oldDate.getFullYear() &&
                      newDate.getMonth() === oldDate.getMonth()
                    ) {
                      newDate = oldDate;
                    }
                    return newDate;
                  });
                }}
              />
            )}
          </div>
          <div>
            {activeCalendar === "month" && formatCalendarHeader(currentDate)}
          </div>
          <div>
            {activeCalendar === "month" && (
              <FaChevronRight
                onClick={() => {
                  setCurrentDate(() => {
                    const oldDate = new Date();
                    const newMonth = new Date(
                      currentDate.setMonth(currentDate.getMonth() + 1)
                    );
                    let newDate = new Date(newMonth.setDate(1));
                    if (
                      newDate.getFullYear() === oldDate.getFullYear() &&
                      newDate.getMonth() === oldDate.getMonth()
                    ) {
                      newDate = oldDate;
                    }
                    return newDate;
                  });
                }}
              />
            )}
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
      <CalendarFactory type={activeCalendar} currentDate={currentDate} />
    </div>
  );
};

const formatCalendarHeader = (date: Date) => {
  return date
    .toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric"
    })
    .split(" ")
    .filter((_, index) => index !== 1)
    .join(" ");
};

const CalendarFactory: React.FC<CalendarFactoryProps> = ({
  type,
  ...props
}) => {
  switch (type) {
    case "month":
      return <MonthCalendar {...props} />;
    case "week":
      return <WeekCalendar {...props} />;
    default:
      return null;
  }
};
