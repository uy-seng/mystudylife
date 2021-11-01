import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectToBeUpdatedOneOffSchedulePayload,
  setToBeUpdatedOneOffSchedulePayload,
} from "../../../shared/EditClass.slice";
import { formatDate } from "../../../utils";
import { Datepicker, Timepicker } from "../../input";
import css from "./EditClass.module.css";

interface Props {}

export const OneOffSchedule: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const toBeUpdatedOneOffSchedulePayload = useAppSelector(
    selectToBeUpdatedOneOffSchedulePayload
  );

  if (toBeUpdatedOneOffSchedulePayload)
    return (
      <div>
        <div className={css.row}>
          <Datepicker
            defaultValue={formatDate(
              new Date(toBeUpdatedOneOffSchedulePayload?.date)
            )}
            name="date"
            label="Date"
            dateHandler={(value) => {
              dispatch(
                setToBeUpdatedOneOffSchedulePayload({
                  key: "date",
                  value: value,
                })
              );
            }}
          />
        </div>
        <div className={css.row}>
          <Timepicker
            value={toBeUpdatedOneOffSchedulePayload.startTime}
            label="Start Time"
            name={"startTime"}
          />
          <Timepicker
            value={toBeUpdatedOneOffSchedulePayload.endTime}
            label="End Time"
            name={"endTime"}
          />
        </div>
      </div>
    );
  else return null;
};
