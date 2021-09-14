import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { ManageSubject, NewAcademicYear } from "../components/modal";
import css from "./Schedule.module.css";

interface Props {}

export const Schedule: React.FC<Props> = () => {
  return (
    <div className={css.content}>
      <header className={css.header}>
        <h2 className={css.title + " txt-lg"}>Schedule</h2>
        <div>
          <ManageSubject />
          <NewAcademicYear />
        </div>
      </header>
      <div className={css.body}>
        <EmptySchedule />
      </div>
    </div>
  );
};

const EmptySchedule: React.FC = () => {
  return (
    <div className={css.emptySchedule}>
      <div className={css.emptyScheduleContent}>
        <div className={css.emptyScheduleIcon}>
          <AiOutlineCalendar />
        </div>
        <div className="txt-lg">Add Your Schedule</div>
        <div className="txt-sm">
          This is where your years, terms, classes and holidays will live. Add
          an academic year to get started
        </div>
        <div>
          <NewAcademicYear />
        </div>
      </div>
    </div>
  );
};
