import React from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  selectDayRotationPayload,
  setDayRotationPayload,
} from "../../../shared/NewAcademicYear.slice";
import { generateArrayBetween } from "../../../utils";
import css from "./DayRotation.module.css";

interface Props {}

export const DayRotation: React.FC<Props> = () => {
  const { numOfDay, startDay, repeatDays } = useAppSelector(
    selectDayRotationPayload
  );
  const dispatch = useAppDispatch();

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="numOfDay">Number of Days</label>
          <select
            onChange={(e) => {
              dispatch(
                setDayRotationPayload({
                  key: "numOfDay",
                  value: parseInt(e.currentTarget.value),
                })
              );
            }}
            defaultValue={numOfDay}
            name="numOfDay"
            id="numOfDay"
          >
            {generateArrayBetween(2, 20).map((number) => (
              <option key={`numOfDay_${number}`} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="startDay">Start Day</label>
          <select
            value={startDay}
            onChange={(e) => {
              dispatch(
                setDayRotationPayload({
                  key: "startDay",
                  value: parseInt(e.currentTarget.value),
                })
              );
            }}
            name="startDay"
            id="startDay"
          >
            {generateArrayBetween(1, numOfDay).map((number) => (
              <option key={`startDay_${number}`} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <div>Days</div>
        <div className={css.days}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day, index) => (
              <div
                key={day}
                onClick={(e) => {
                  const toBeActive = !e.currentTarget.classList.contains(
                    css.active
                  );
                  if (toBeActive) {
                    dispatch(
                      setDayRotationPayload({
                        key: "repeatDays",
                        value: [...repeatDays, index + 1],
                      })
                    );
                  } else {
                    dispatch(
                      setDayRotationPayload({
                        key: "repeatDays",
                        value: repeatDays.filter((val) => val !== index + 1),
                      })
                    );
                  }
                  e.currentTarget.classList.toggle(css.active);
                }}
                className={css.day}
              >
                {day}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
