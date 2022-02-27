import React from "react";
import { Counter } from "../components/counter";
import { NewTask } from "../components/modal";
import { ViewTask } from "../components/modal/ViewTask";
import { useGetTasksQuery } from "../generated/graphql";
import { formatDate } from "../utils";

import { GrInProgress } from "react-icons/gr";

import css from "./Dashboard.module.css";
import moment from "moment";

interface Props {}

export const Dashboard: React.FC<Props> = () => {
  const { data: tasks } = useGetTasksQuery();

  React.useLayoutEffect(() => {
    moment.locale("en", {
      week: {
        dow: 1,
      },
    });
  }, []);

  if (tasks)
    return (
      <div className={css.content}>
        <header className={css.header}>
          <div className={css.headerSection}>
            <div>
              {/* title */}
              <div>Today</div>
              {/* subtitle */}
              <div>
                {`${new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                })} ${formatDate(new Date())}`}
              </div>
            </div>
            <div>
              {/* doughnut 1 */}
              <div>
                <Counter title={"0"} subtitle={"classes"} data={[1]} />
              </div>
              {/* doughnut 2 */}
              <div>
                <Counter title={"0"} subtitle={"exams"} data={[1]} />
              </div>
            </div>
          </div>
          <div className={css.headerSection}>
            <div>
              {/* title */}
              <div>Task</div>
              {/* new task modal */}
              <div>
                <NewTask />
              </div>
            </div>
            <div>
              {/* dougnut */}
              <div>
                <Counter
                  title={tasks?.getTasks.length.toString() || "0"}
                  subtitle={"Tasks"}
                  data={[
                    tasks?.getTasks.filter((task) =>
                      moment(task.due_date + "T00:00:00").isBefore(
                        new Date(new Date().setHours(0, 0, 0, 0))
                      )
                    ).length || 0,
                    tasks?.getTasks.length -
                      (tasks?.getTasks.filter((task) =>
                        moment(task.due_date + "T00:00:00").isBefore(
                          new Date(new Date().setHours(0, 0, 0, 0))
                        )
                      ).length || 0),
                  ]}
                />
              </div>
            </div>
          </div>
          <div className={css.headerSection}>
            <div>
              {/* title */}
              <div>Exams</div>
            </div>
            <div>
              {/* doughnut */}
              <div>
                <Counter title={"0"} subtitle={"Exams"} data={[1]} />
              </div>
            </div>
          </div>
        </header>
        <div className={css.body}>
          <div className={css.bodySection}></div>
          <div className={css.bodySection}>
            {/* overdue */}
            {tasks &&
              tasks.getTasks
                .filter((task) =>
                  moment(task.due_date + "T00:00:00").isBefore(
                    new Date(new Date().setHours(0, 0, 0, 0))
                  )
                )
                .sort((a, b) => +new Date(a.due_date) - +new Date(b.due_date))
                .map((task, index) => (
                  <React.Fragment>
                    {index === 0 && (
                      <div
                        style={{
                          color: "var(--error)",
                          fontWeight: "bold",
                          marginTop: "1rem",
                        }}
                      >
                        Overdue
                      </div>
                    )}

                    <ViewTask
                      childController={
                        <div className={css.task}>
                          <div className={css.left}>
                            <div>{task.title}</div>
                            <div>{task.subject.name}</div>
                          </div>
                          <div className={css.right}>
                            <div>
                              {formatDate(new Date(task.due_date + "T00:00:00"))
                                .split(" ")
                                .slice(0, 2)
                                .join(" ")}
                            </div>
                            <div>{task.completed}%</div>
                          </div>
                        </div>
                      }
                      data={task}
                    />
                  </React.Fragment>
                ))}
            {/* due this week */}
            {tasks &&
              tasks.getTasks
                .filter(
                  (task) =>
                    moment(task.due_date).isAfter(new Date()) &&
                    moment(task.due_date).isSame(new Date(), "week")
                )
                .sort((a, b) => +new Date(a.due_date) - +new Date(b.due_date))
                .map((task, index) => (
                  <React.Fragment>
                    {index === 0 && (
                      <div
                        style={{
                          color: "var(--primary)",
                          fontWeight: "bold",
                          marginTop: "1rem",
                        }}
                      >
                        Due this week
                      </div>
                    )}
                    <ViewTask
                      childController={
                        <div className={css.task}>
                          <div className={css.left}>
                            <div>{task.title}</div>
                            <div>{task.subject.name}</div>
                          </div>
                          <div className={css.right}>
                            <div>
                              {formatDate(new Date(task.due_date + "T00:00:00"))
                                .split(" ")
                                .slice(0, 2)
                                .join(" ")}
                            </div>
                            <div>{task.completed}%</div>
                          </div>
                        </div>
                      }
                      data={task}
                    />
                  </React.Fragment>
                ))}

            {/* due today */}
            {tasks &&
              tasks.getTasks
                .filter(
                  (task) =>
                    moment(new Date()).format("YYYY-MM-DD") === task.due_date
                )
                .map((task, index) => (
                  <React.Fragment>
                    {index === 0 && (
                      <div
                        style={{
                          color: "var(--secondary)",
                          fontWeight: "bold",
                          marginTop: "1rem",
                        }}
                      >
                        Due today
                      </div>
                    )}
                    <ViewTask
                      childController={
                        <div className={css.task}>
                          <div className={css.left}>
                            <div>{task.title}</div>
                            <div>{task.subject.name}</div>
                          </div>
                          <div className={css.right}>
                            <div>
                              {formatDate(new Date(task.due_date + "T00:00:00"))
                                .split(" ")
                                .slice(0, 2)
                                .join(" ")}
                            </div>
                            <div>{task.completed}%</div>
                          </div>
                        </div>
                      }
                      data={task}
                    />
                  </React.Fragment>
                ))}
          </div>
          <div className={css.bodySection}></div>
        </div>
      </div>
    );
  return null;
};
