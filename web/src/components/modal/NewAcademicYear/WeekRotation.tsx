import React from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  selectWeekRotationPayload,
  setWeekRotationPayload,
} from "../../../shared/NewAcademicYear.slice";
import { generateArrayBetween } from "../../../utils";

interface Props {}

export const WeekRotation: React.FC<Props> = () => {
  const { numOfWeek, startWeek } = useAppSelector(selectWeekRotationPayload);
  const dispatch = useAppDispatch();
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div>
          <label htmlFor="numOfWeek">Number of Weeks</label>
          <select
            value={numOfWeek}
            onChange={(e) => {
              dispatch(
                setWeekRotationPayload({
                  key: "numOfWeek",
                  value: parseInt(e.currentTarget.value),
                })
              );
            }}
            name="numOfWeek"
            id="numOfWeek"
          >
            {generateArrayBetween(2, 4).map((num) => (
              <option value={num}>{num}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="startWeek">Start Week</label>
          <select
            value={startWeek}
            onChange={(e) => {
              dispatch(
                setWeekRotationPayload({
                  key: "startWeek",
                  value: parseInt(e.currentTarget.value),
                })
              );
            }}
            name="startWeek"
            id="startWeek"
          >
            {generateArrayBetween(1, numOfWeek).map((num) => (
              <option value={num}>Week {num}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
