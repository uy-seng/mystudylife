import React from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  selectWeekRotationPayload,
  setWeekRotationPayload,
} from "../../../shared/NewAcademicYear.slice";
import { generateArrayBetween } from "../../../utils";
import { BasicSelect } from "../../select";

interface Props {}

export const WeekRotation: React.FC<Props> = () => {
  const { numOfWeek, startWeek } = useAppSelector(selectWeekRotationPayload);
  const dispatch = useAppDispatch();
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <BasicSelect
            onChange={(e) => {
              dispatch(
                setWeekRotationPayload({
                  key: "numOfWeek",
                  value: parseInt(e.currentTarget.value),
                })
              );
            }}
            label="Number of Weeks"
            options={generateArrayBetween(2, 4).map((number) => {
              return {
                key: number,
                value: number,
              };
            })}
          />
        </div>
        <div>
          <BasicSelect
            label="Start Week"
            onChange={(e) => {
              dispatch(
                setWeekRotationPayload({
                  key: "startWeek",
                  value: parseInt(e.currentTarget.value),
                })
              );
            }}
            options={generateArrayBetween(1, numOfWeek).map((number) => {
              return {
                key: number,
                value: number,
              };
            })}
          />
        </div>
      </div>
    </div>
  );
};
