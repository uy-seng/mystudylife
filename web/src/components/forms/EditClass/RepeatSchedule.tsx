import moment from "moment";
import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectToBeUpdatedRepeatSchedules } from "../../../shared/EditClass.slice";
import { RepeatSchedulePayload } from "../../../shared/NewClass.slice";
import { EditRepeatSchedule, NewRepeatSchedule } from "../../modal";
import css from "./RepeatSchedule.module.css";

interface Props {}

export const RepeatSchedule: React.FC<Props> = () => {
  const toBeUpdatedRepeatSchedules = useAppSelector(
    selectToBeUpdatedRepeatSchedules
  );
  const dayOfWeekOptions = React.useMemo(
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

  if (toBeUpdatedRepeatSchedules)
    return (
      <div>
        {toBeUpdatedRepeatSchedules.map((repeatSchedule) => (
          <EditRepeatSchedule
            data={repeatSchedule}
            childController={
              <div className={css.option}>
                <div>
                  <div>
                    {moment(repeatSchedule.startTime, "HH:mm").format("hh:mm")}{" "}
                    {" - "}
                    {moment(repeatSchedule.endTime, "HH:mm").format("hh:mm")}
                  </div>
                  <div>
                    {repeatSchedule.days
                      .map(
                        (day) =>
                          dayOfWeekOptions.filter((d) => d.value === day)[0].key
                      )
                      .join(",")}
                  </div>
                </div>
                <div></div>
              </div>
            }
          />
        ))}
        <NewRepeatSchedule />
      </div>
    );
  else return null;
};
