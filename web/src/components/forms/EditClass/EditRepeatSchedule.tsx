import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { DayOfWeek, useGetAcademicYearQuery } from "../../../generated/graphql";
import {
  selectToBeUpdatedClassPayload,
  selectToBeUpdatedRepeatSchedules,
  setToBeUpdatedRepeatSchedules,
} from "../../../shared/EditClass.slice";
import {
  ClassPayload,
  RepeatSchedulePayload,
} from "../../../shared/NewClass.slice";
import { generateArrayBetween, mutateItemInArray } from "../../../utils";
import { Button } from "../../button";
import { Timepicker } from "../../input";
import { BasicSelect } from "../../select";
import css from "./EditRepeatSchedule.module.css";
import ctx from "classnames";
import moment from "moment";

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  data: RepeatSchedulePayload & { id: string };
}

export const EditRepeatScheduleForm: React.FC<Props> = ({ setShow, data }) => {
  const dispatch = useAppDispatch();
  const { academicYearId } = useAppSelector(
    selectToBeUpdatedClassPayload
  ) as ClassPayload;
  const [
    toBeUpdatedRepeatSchedulePayload,
    setToBeUpdatedRepeatSchedulePayload,
  ] = React.useState<RepeatSchedulePayload & { id: string }>();
  const { data: academicYear } = useGetAcademicYearQuery({
    variables: { id: academicYearId },
  });
  const toBeUpdatedRepeatSchedules = useAppSelector(
    selectToBeUpdatedRepeatSchedules
  );

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
    if (data && !toBeUpdatedRepeatSchedulePayload) {
      setToBeUpdatedRepeatSchedulePayload(data);
    }
  }, [data]);

  // add render counter to fix bug for initial rendering problem of start time
  const [startTimeRenderCounter, setStartTimeRenderCounter] =
    React.useState<number>(0);
  React.useEffect(() => {
    setStartTimeRenderCounter(startTimeRenderCounter + 1);
    if (toBeUpdatedRepeatSchedulePayload && startTimeRenderCounter > 1) {
      setToBeUpdatedRepeatSchedulePayload({
        ...toBeUpdatedRepeatSchedulePayload,
        endTime: moment(toBeUpdatedRepeatSchedulePayload?.startTime, "HH:mm")
          .add(1, "hours")
          .add(50, "minutes")
          .format("HH:mm"),
      });
    }
  }, [toBeUpdatedRepeatSchedulePayload?.startTime]);

  if (
    academicYear &&
    toBeUpdatedRepeatSchedulePayload &&
    toBeUpdatedRepeatSchedules
  )
    return (
      <div>
        {academicYear.getAcademicYear?.schedule.type === "weekRotation" && (
          <div className={css.weekRotation}>
            <BasicSelect
              defaultValue={data.rotationWeek}
              label="Rotation Week"
              onChange={(e) => {
                setToBeUpdatedRepeatSchedulePayload({
                  ...toBeUpdatedRepeatSchedulePayload,
                  rotationWeek: parseInt(e.target.value),
                });
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
              className={
                data.days.includes(day.value as DayOfWeek)
                  ? ctx(css.day, css.active)
                  : css.day
              }
              onClick={(e) => {
                const toBeActive = !e.currentTarget.classList.contains(
                  css.active
                );
                if (toBeActive) {
                  // add
                  setToBeUpdatedRepeatSchedulePayload({
                    ...toBeUpdatedRepeatSchedulePayload,
                    days: [
                      ...toBeUpdatedRepeatSchedulePayload.days,
                      day.value as DayOfWeek,
                    ],
                  });
                } else {
                  // remove
                  setToBeUpdatedRepeatSchedulePayload({
                    ...toBeUpdatedRepeatSchedulePayload,
                    days: [
                      ...toBeUpdatedRepeatSchedulePayload.days.filter(
                        (d) => d !== day.value
                      ),
                    ],
                  });
                }
                e.currentTarget.classList.toggle(css.active);
              }}
            >
              {day.key}
            </div>
          ))}
        </div>

        <div className={css.row}>
          <Timepicker
            onChange={(e) => {
              setToBeUpdatedRepeatSchedulePayload({
                ...toBeUpdatedRepeatSchedulePayload,
                startTime: e.target.value,
              });
            }}
            value={toBeUpdatedRepeatSchedulePayload.startTime}
            label="Start Time"
            name={"startTime"}
          />
          <Timepicker
            value={toBeUpdatedRepeatSchedulePayload.endTime}
            onChange={(e) => {
              setToBeUpdatedRepeatSchedulePayload({
                ...toBeUpdatedRepeatSchedulePayload,
                endTime: e.target.value,
              });
            }}
            label="End Time"
            name={"endTime"}
          />
        </div>

        <Button
          onClick={() => {
            const newToBeUpdatedRepeatSchedules = mutateItemInArray(
              toBeUpdatedRepeatSchedules,
              toBeUpdatedRepeatSchedules.findIndex((el) => el.id === data.id),
              toBeUpdatedRepeatSchedulePayload
            );
            dispatch(
              setToBeUpdatedRepeatSchedules([...newToBeUpdatedRepeatSchedules])
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
