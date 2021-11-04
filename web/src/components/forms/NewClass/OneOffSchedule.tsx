import moment from "moment";
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

  React.useEffect(() => {
    dispatch(
      setOneOffSchedulePayload({
        key: "endTime",
        value: moment(startTime, "HH:mm").add(1, "hours").format("HH:mm"),
      })
    );
  }, [startTime]);

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
        <Timepicker
          onChange={(e) => {
            dispatch(
              setOneOffSchedulePayload({
                key: "startTime",
                value: e.target.value,
              })
            );
          }}
          value={startTime}
          label="Start Time"
          name={"startTime"}
        />
        <Timepicker
          onChange={(e) => {
            dispatch(
              setOneOffSchedulePayload({
                key: "endTime",
                value: e.target.value,
              })
            );
          }}
          value={endTime}
          label="End Time"
          name={"endTime"}
        />
      </div>
    </div>
  );
};
