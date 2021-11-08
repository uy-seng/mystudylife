import React from "react";
import { Calendar } from "../components/calendar";
import css from "./ManageCalendar.module.css";

interface Props {}

export const ManageCalendar: React.FC<Props> = () => {
  return (
    <div className={css.managecalendar}>
      {/* <h2
        className="title"
        style={{
          borderBottom: "1px solid #cdd4d4",
          paddingLeft: "1rem",
          fontWeight: 400,
          paddingBottom: "1rem",
        }}
      >
        Calendar
      </h2> */}
      <Calendar />
    </div>
  );
};
