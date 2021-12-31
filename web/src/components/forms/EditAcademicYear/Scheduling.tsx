import React from "react";

import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  selectAcademicYearSchedulePayload,
  setAcademicYearSchedulePayload
} from "../../../shared/NewAcademicYear.slice";

import { DayRotation } from "./DayRotation";
import { WeekRotation } from "./WeekRotation";

import css from "./Scheduling.module.css";

interface Props {}

export const Scheduling: React.FC<Props> = () => {
  const { type } = useAppSelector(selectAcademicYearSchedulePayload);
  const dispatch = useAppDispatch();
  return (
    <div>
      <div>
        <div className={css.group}>
          <input
            checked={type === "fixed"}
            onChange={(e) =>
              dispatch(
                setAcademicYearSchedulePayload({
                  key: "type",
                  value: "fixed"
                })
              )
            }
            type="radio"
            name="academicYearScheduleType"
            id="fixed"
          />
          <label htmlFor="fixed">
            Class occur on the same day every week (fixed)
          </label>
        </div>
        <div className={css.group}>
          <input
            checked={type === "weekRotation"}
            onChange={() =>
              dispatch(
                setAcademicYearSchedulePayload({
                  key: "type",
                  value: "weekRotation"
                })
              )
            }
            type="radio"
            name="academicYearScheduleType"
            id="weekRotation"
          />
          <label htmlFor="weekRotation">
            Class occur on the same day every x week (week rotation)
          </label>
        </div>
        <div className={css.group}>
          <input
            checked={type === "dayRotation"}
            onChange={() =>
              dispatch(
                setAcademicYearSchedulePayload({
                  key: "type",
                  value: "dayRotation"
                })
              )
            }
            type="radio"
            name="academicYearScheduleType"
            id="dayRotation"
          />
          <label htmlFor="dayRotation">
            Class occur on a numbered or lettered day (day rotation)
          </label>
        </div>
      </div>
      <div>
        <SchedulingFactory type={type} />
      </div>
    </div>
  );
};

interface SchedulingFactoryProps {
  type: string;
}

const SchedulingFactory: React.FC<SchedulingFactoryProps> = ({ type }) => {
  switch (type) {
    case "weekRotation":
      return <WeekRotation />;
    case "dayRotation":
      return <DayRotation />;
    default:
      return null;
  }
};
