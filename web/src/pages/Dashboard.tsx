import React from "react";
import {
  AiFillCalendar,
  AiFillCheckSquare,
  AiFillDashboard,
  AiFillSchedule,
  AiFillSnippets,
  AiOutlineFileSearch,
} from "react-icons/ai";
import { Counter } from "../components/Counter";
import { NewTask } from "../components/modal";
import { Sidebar } from "../components/Sidebar";

import css from "./Dashboard.module.css";

interface Props {}

export const Dashboard: React.FC<Props> = () => {
  return (
    <div className={css.page}>
      <Sidebar
        menu={[
          { icon: <AiFillDashboard />, key: "dashboard" },
          { icon: <AiFillCalendar />, key: "calendar" },
          { icon: <AiFillCheckSquare />, key: "task" },
          { icon: <AiFillSnippets />, key: "exam" },
          { icon: <AiFillSchedule />, key: "schedule" },
          { icon: <AiOutlineFileSearch />, key: "search" },
        ]}
      />
      <div className={css.content}>
        <header className={css.header}>
          <div className={css.headerSection}>
            <div>
              {/* title */}
              <div>Today</div>
              {/* subtitle */}
              <div>Wednesday, September 1</div>
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
          <div className={css.bodySection}></div>
          <div className={css.bodySection}></div>
        </div>
      </div>
    </div>
  );
};
