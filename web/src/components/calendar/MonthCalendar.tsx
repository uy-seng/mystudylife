import moment from "moment";
import React from "react";
import css from "./MonthCalendar.module.css";
import cx from "classnames";
import { useGetClassesQuery } from "../../generated/graphql";
import { generateClassByDate, mod } from "../../utils";
import { ViewClass } from "../modal";
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
  const { data: classes } = useGetClassesQuery();

  React.useEffect(() => {
    setFocusDate(currentDate);
  }, [currentDate]);

  if (classes)
    return (
      <div className={css.wrapper}>
        <div className={css.left}>
          <table className={css.calendar}>
            <thead>
              <tr>
                {["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"].map(
                  (day) => (
                    <th>{day}</th>
                  )
                )}
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
                            mod(currentDate.getMonth() - 1, 12) + 1
                          }`
                        ).daysInMonth();
                        return (
                          <td>
                            <div className={css.class}>
                              {generateClassByDate(
                                classes,
                                new Date(
                                  `${
                                    mod(currentDate.getMonth() + 1, 12) === 1
                                      ? currentDate.getFullYear() - 1
                                      : currentDate.getFullYear()
                                  }-${
                                    mod(currentDate.getMonth() - 1, 12) + 1
                                  }-${
                                    daysInPreviousMonth -
                                    startDayOfMonth +
                                    column +
                                    1
                                  }`
                                )
                              )?.map((c, index, t) => {
                                if (index < 2) {
                                  return (
                                    <div className={css.classItem}>
                                      {c.subject.name} - {c.module}
                                    </div>
                                  );
                                } else {
                                  if (index === 2 && index < t.length - 1) {
                                    return (
                                      <div className={css.more}>
                                        {t.length - 2} more
                                      </div>
                                    );
                                  }
                                  return;
                                }
                              })}
                            </div>
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
                            data-value={daysInMonth[0]}
                            onClick={(e) => {
                              if (
                                e.target !==
                                e.currentTarget.querySelector(`.${css.more}`)
                              ) {
                                const day =
                                  e.currentTarget.getAttribute("data-value");
                                setFocusDate(
                                  new Date(
                                    `${currentDate.getFullYear()}-${
                                      currentDate.getMonth() + 1
                                    }-${day}`
                                  )
                                );
                              }
                            }}
                            className={cx(
                              daysInMonth[0] === focusDate.getDate() &&
                                css.focused
                            )}
                          >
                            <div className={css.class}>
                              {generateClassByDate(
                                classes,
                                new Date(
                                  `${currentDate.getFullYear()}-${
                                    currentDate.getMonth() + 1
                                  }-${daysInMonth[0]}`
                                )
                              )?.map((c, index, t) => {
                                if (index < 2) {
                                  return (
                                    <div className={css.classItem}>
                                      {c.subject.name} - {c.module}
                                    </div>
                                  );
                                } else {
                                  if (index === 2 && index < t.length - 1) {
                                    return (
                                      <div
                                        onMouseEnter={(e) => {
                                          e.currentTarget.parentElement?.parentElement
                                            ?.querySelector(
                                              `.${css.expandedClass}`
                                            )
                                            ?.classList.add(css.active);
                                          (
                                            e.currentTarget.parentElement?.parentElement?.querySelector(
                                              `.${css.expandedClass}`
                                            ) as HTMLElement
                                          ).style.height = `${
                                            e.currentTarget.parentElement?.parentElement?.querySelector(
                                              `.${css.expandedClass}`
                                            )?.scrollHeight
                                          }px`;
                                        }}
                                        className={css.more}
                                      >
                                        {t.length - 2} more
                                      </div>
                                    );
                                  }
                                  return;
                                }
                              })}
                            </div>
                            {/* full class list */}
                            <div
                              onMouseLeave={(e) => {
                                e.currentTarget.classList.remove(css.active);
                              }}
                              className={css.expandedClass}
                            >
                              <div className={css.class}>
                                {generateClassByDate(
                                  classes,
                                  new Date(
                                    `${currentDate.getFullYear()}-${
                                      currentDate.getMonth() + 1
                                    }-${daysInMonth[0]}`
                                  )
                                )?.map((c) => (
                                  <div className={css.classItem}>
                                    {c.subject.name} - {c.module}
                                  </div>
                                ))}
                              </div>
                            </div>
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
                          <div className={css.class}>
                            {generateClassByDate(
                              classes,
                              new Date(
                                `${
                                  mod(currentDate.getMonth() + 2, 12) === 1
                                    ? currentDate.getFullYear() + 1
                                    : currentDate.getFullYear()
                                }-${
                                  mod(currentDate.getMonth() + 2, 12) === 0
                                    ? 12
                                    : mod(currentDate.getMonth() + 2, 12)
                                }-${row * 7 + column - remainder + 1}`
                              )
                            )?.map((c, index, t) => {
                              if (index < 2) {
                                return (
                                  <div className={css.classItem}>
                                    {c.subject.name} - {c.module}
                                  </div>
                                );
                              } else {
                                if (index === 2 && index < t.length - 1) {
                                  return (
                                    <button className={css.more}>
                                      {t.length - 2} more
                                    </button>
                                  );
                                }
                                return;
                              }
                            })}
                          </div>
                          <div className={cx(css.cell, css.other)}>
                            <div>...</div>
                            <div>{row * 7 + column - remainder + 1}</div>
                          </div>
                        </td>
                      );
                    }
                    return (
                      <td
                        data-value={daysInMonth[0]}
                        onClick={(e) => {
                          if (
                            e.target !==
                            e.currentTarget.querySelector(`.${css.more}`)
                          ) {
                            const day =
                              e.currentTarget.getAttribute("data-value");
                            setFocusDate(
                              new Date(
                                `${currentDate.getFullYear()}-${
                                  currentDate.getMonth() + 1
                                }-${day}`
                              )
                            );
                          }
                        }}
                        className={cx(
                          daysInMonth[0] === focusDate.getDate() && css.active
                        )}
                      >
                        <div className={css.class}>
                          {generateClassByDate(
                            classes,
                            new Date(
                              `${currentDate.getFullYear()}-${
                                currentDate.getMonth() + 1
                              }-${daysInMonth[0]}`
                            )
                          )?.map((c, index, t) => {
                            if (index < 2) {
                              return (
                                <ViewClass
                                  childController={
                                    <div className={css.classItem}>
                                      {c.subject.name} - {c.module}
                                    </div>
                                  }
                                />
                              );
                            } else {
                              if (index === 2 && index < t.length - 1) {
                                return (
                                  <div
                                    onMouseEnter={(e) => {
                                      e.currentTarget.parentElement?.parentElement
                                        ?.querySelector(`.${css.expandedClass}`)
                                        ?.classList.add(css.active);
                                      (
                                        e.currentTarget.parentElement?.parentElement?.querySelector(
                                          `.${css.expandedClass}`
                                        ) as HTMLElement
                                      ).style.height = `${
                                        e.currentTarget.parentElement?.parentElement?.querySelector(
                                          `.${css.expandedClass}`
                                        )?.scrollHeight
                                      }px`;
                                    }}
                                    className={css.more}
                                  >
                                    {t.length - 2} more
                                  </div>
                                );
                              }
                              return;
                            }
                          })}
                        </div>
                        {/* full class list */}
                        <div
                          onMouseLeave={(e) => {
                            e.currentTarget.classList.remove(css.active);
                          }}
                          className={css.expandedClass}
                        >
                          <div className={css.class}>
                            {generateClassByDate(
                              classes,
                              new Date(
                                `${currentDate.getFullYear()}-${
                                  currentDate.getMonth() + 1
                                }-${daysInMonth[0]}`
                              )
                            )?.map((c) => (
                              <ViewClass
                                childController={
                                  <div className={css.classItem}>
                                    {c.subject.name} - {c.module}
                                  </div>
                                }
                              />
                            ))}
                          </div>
                        </div>
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
          <div>{moment(focusDate).format("dddd, MMMM DD")}</div>
          <div></div>
        </div>
      </div>
    );
  else return null;
};
