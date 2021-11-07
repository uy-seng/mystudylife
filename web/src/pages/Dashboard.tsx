import React from "react";
import { Counter } from "../components/counter";
import { NewTask } from "../components/modal";
import { useGetTasksQuery } from "../generated/graphql";
import { formatDate } from "../utils";

import css from "./Dashboard.module.css";

interface Props {}

export const Dashboard: React.FC<Props> = () => {
  const { data: tasks } = useGetTasksQuery();

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
              <Counter title={"0"} subtitle={"Tasks"} data={[1, 1]} />
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
          {tasks && tasks.getTasks.map((task) => <div>{task.title}</div>)}
        </div>
        <div className={css.bodySection}></div>
      </div>
    </div>
  );
};
