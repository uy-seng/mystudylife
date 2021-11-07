import moment from "moment";
import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { DayOfWeek, useGetAcademicYearQuery } from "../../../generated/graphql";
import {
  selectClassPayload,
  selectRepeatSchedules,
  setRepeatSchedules,
} from "../../../shared/NewClass.slice";
import { generateArrayBetween } from "../../../utils";
import { Button } from "../../button";
import { Timepicker } from "../../input";
import { BasicSelect } from "../../select";
import css from "./RepeatSchedule.module.css";

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RepeatScheduleForm: React.FC<Props> = ({ setShow }) => {
  const [days, setDays] = React.useState<DayOfWeek[]>([]);
  const [startTime, setStartTime] = React.useState("08:00");
  const [endTime, setEndTime] = React.useState("09:50");
  const [rotationWeek, setRotationWeek] = React.useState(0);
  const repeatSchedules = useAppSelector(selectRepeatSchedules);
  const dispatch = useAppDispatch();
  const { academicYearId } = useAppSelector(selectClassPayload);
  const { data: academicYear } = useGetAcademicYearQuery({
    variables: { id: academicYearId },
  });

  const dayOfWeekOptions = useMemo(
    () => [
      { key: "Sun", value: "sunday" },
      { key: "Mon", value: "monday" },
      { key: "Tue", value: "tuesday" },
      { key: "Wed", value: "wednesday" },
      { key: "Thu", value: "thursday" },
      { key: "Fri", value: "friday" },
      { key: "Sat", value: "saturday" },
    ],
    []
  );

  React.useEffect(() => {
    setEndTime(
      moment(startTime, "HH:mm")
        .add(1, "hours")
        .add(50, "minutes")
        .format("HH:mm")
    );
  }, [startTime]);

  if (academicYear)
    return (
      <div>
        {academicYear.getAcademicYear?.schedule.type === "weekRotation" && (
          <div className={css.weekRotation}>
            <BasicSelect
              label="Rotation Week"
              onChange={(e) => {
                setRotationWeek(parseInt(e.target.value));
              }}
              options={[
                {
                  key: "Every week",
                  value: 0,
                },
                ...generateArrayBetween(
                  1,
                  (academicYear.getAcademicYear.schedule.weekRotation
                    ?.numOfWeek as number) + 1
                ).map((number) => {
                  return {
                    key: number,
                    value: number,
                  };
                }),
              ]}
            />
          </div>
        )}
        <div className={css.days}>
          {dayOfWeekOptions.map((day, index) => (
            <div
              key={day.key}
              onClick={(e) => {
                const toBeActive = !e.currentTarget.classList.contains(
                  css.active
                );
                if (toBeActive) {
                  // add
                  setDays([...days, day.value as DayOfWeek]);
                } else {
                  // remove
                  setDays([...days.filter((d) => d !== day.value)]);
                }
                e.currentTarget.classList.toggle(css.active);
              }}
              className={css.day}
            >
              {day.key}
            </div>
          ))}
        </div>

        <div className={css.row}>
          <Timepicker
            onChange={(e) => {
              setStartTime(e.target.value);
            }}
            value={startTime}
            label="Start Time"
            name={"startTime"}
          />
          <Timepicker
            value={endTime}
            onChange={(e) => {
              setEndTime(e.target.value);
            }}
            label="End Time"
            name={"endTime"}
          />
        </div>

        <Button
          onClick={() => {
            if (academicYear.getAcademicYear?.schedule.type === "weekRotation")
              dispatch(
                setRepeatSchedules([
                  ...repeatSchedules,
                  {
                    days: days,
                    startTime: startTime,
                    endTime: endTime,
                    rotationWeek: rotationWeek,
                  },
                ])
              );
            else
              dispatch(
                setRepeatSchedules([
                  ...repeatSchedules,
                  {
                    days: days,
                    startTime: startTime,
                    endTime: endTime,
                  },
                ])
              );
            setShow(false);
          }}
          style={{
            padding: "8px",
          }}
          as="primary"
          text="Save"
        />
      </div>
    );
  return null;
};
