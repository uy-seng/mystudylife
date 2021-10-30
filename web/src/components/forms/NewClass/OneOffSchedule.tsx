import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectOneOffSchedulePayload,
  setOneOffSchedulePayload,
} from "../../../shared/NewClass.slice";
import { formatDate } from "../../../utils";
import { Datepicker, Timepicker } from "../../input";
import css from "./NewClass.module.css";

interface Props {}

export const OneOffSchedule: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { startTime, endTime, date } = useAppSelector(
    selectOneOffSchedulePayload
  );

  return (
    <div>
      <div className={css.row}>
        <Datepicker
          defaultValue={date}
          name="date"
          label="Date"
          dateHandler={(value) => {
            dispatch(
              setOneOffSchedulePayload({
                key: "date",
                value: value,
              })
            );
          }}
        />
      </div>
      <div className={css.row}>
        <Timepicker value={startTime} label="Start Time" name={"startTime"} />
        <Timepicker value={endTime} label="End Time" name={"endTime"} />
      </div>
    </div>
  );
};
