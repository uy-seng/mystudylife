import moment from "moment";
import React from "react";
import css from "./MonthCalendar.module.css";
import cx from "classnames";
interface Props {
  currentDate: Date;
}

export const MonthCalendar: React.FC<Props> = ({ currentDate }) => {
  const totalDaysInMonth: number = moment(
    currentDate
      .toISOString()
      .split("T")[0]
      .split("-")
      .filter((e, index) => index !== 2)
      .join("-")
  ).daysInMonth();
  const startDayOfMonth = new Date(
    currentDate
      .toISOString()
      .split("T")[0]
      .split("-")
      .filter((e, index) => index !== 2)
      .concat(["01"])
      .join("-")
  ).getDay();
  const daysInMonth = Array.from(Array(totalDaysInMonth), (v, k) => k + 1);
  const [focusDate, setFocusDate] = React.useState(currentDate);

  React.useEffect(() => {
    setFocusDate(currentDate);
  }, [currentDate]);

  return (
    <div className={css.wrapper}>
      <div className={css.left}>
        <table className={css.calendar}>
          <thead>
            <tr>
              {["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"].map((day) => (
                <th>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* generate table row */}
            {Array.from({ length: 6 }).map((r, row) => (
              <tr>
                {Array.from({ length: 7 }).map((c, column) => {
                  if (row === 0) {
                    if (column < startDayOfMonth) {
                      //   add modulo negative number fix
                      const daysInPreviousMonth = moment(
                        `${currentDate.getFullYear()}-${
                          ((((currentDate.getMonth() - 1) % 12) + 12) % 12) + 1
                        }`
                      ).daysInMonth();
                      return (
                        <td>
                          <div className={cx(css.cell, css.other)}>
                            <div>...</div>
                            <div>
                              {daysInPreviousMonth -
                                startDayOfMonth +
                                column +
                                1}
                            </div>
                          </div>
                        </td>
                      );
                    } else {
                      return (
                        <td
                          className={cx(
                            daysInMonth[0] === focusDate.getDate() &&
                              css.focused
                          )}
                        >
                          <div className={css.cell}>
                            <div>...</div>
                            <div>{daysInMonth.splice(0, 1)[0]}</div>
                          </div>
                        </td>
                      );
                    }
                  }

                  if (daysInMonth.length === 0) {
                    const remainder = totalDaysInMonth + startDayOfMonth;
                    return (
                      <td>
                        <div className={cx(css.cell, css.other)}>
                          <div>...</div>
                          <div>{row * 7 + column - remainder + 1}</div>
                        </div>
                      </td>
                    );
                  }
                  return (
                    <td
                      className={cx(
                        daysInMonth[0] === new Date().getDate() &&
                          currentDate.getMonth() === new Date().getMonth() &&
                          currentDate.getFullYear() ===
                            new Date().getFullYear() &&
                          css.active
                      )}
                    >
                      <div className={css.cell}>
                        <div>...</div>
                        <div>{daysInMonth.splice(0, 1)[0]}</div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={css.right}>
        <div>{moment(currentDate).format("dddd, MMMM DD")}</div>
        <div></div>
      </div>
    </div>
  );
};
