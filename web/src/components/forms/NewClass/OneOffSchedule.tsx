import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import { setOneOffSchedulePayload } from "../../../shared/NewClass.slice";
import { formatDate } from "../../../utils";
import { Datepicker, Timepicker } from "../../input";
import css from "./NewClass.module.css";

interface Props {}

export const OneOffSchedule: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <div className={css.row}>
        <Datepicker
          defaultValue={formatDate(new Date())}
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
        <Timepicker label="Start Time" name={"startTime"} />
        <Timepicker label="End Time" name={"endTime"} />
      </div>
    </div>
  );
};
