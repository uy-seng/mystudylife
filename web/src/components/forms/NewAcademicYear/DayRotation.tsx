import React from "react";

import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  selectDayRotationPayload,
  setDayRotationPayload,
} from "../../../shared/NewAcademicYear.slice";
import { generateArrayBetween } from "../../../utils";

import { BasicSelect } from "../../select";

import css from "./DayRotation.module.css";

interface Props {}

export const DayRotation: React.FC<Props> = () => {
  const { numOfDay, repeatDays } = useAppSelector(selectDayRotationPayload);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "1rem 0",
        }}
      >
        <div>
          <BasicSelect
            label="Number of Days"
            onChange={(e) => {
              dispatch(
                setDayRotationPayload({
                  key: "numOfDay",
                  value: parseInt(e.currentTarget.value),
                })
              );
            }}
            options={generateArrayBetween(2, 20).map((number) => {
              return {
                key: number,
                value: number,
              };
            })}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <BasicSelect
            onChange={(e) => {
              dispatch(
                setDayRotationPayload({
                  key: "startDay",
                  value: parseInt(e.currentTarget.value),
                })
              );
            }}
            label="Start Day"
            options={generateArrayBetween(1, numOfDay).map((number) => {
              return {
                key: number,
                value: number,
              };
            })}
          />
        </div>
      </div>
      <div>
        <div style={{ marginBottom: "0.5rem" }}>Days</div>
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
