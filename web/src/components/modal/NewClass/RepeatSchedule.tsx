import moment from "moment";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useAppSelector } from "../../../app/hooks";
import { selectRepeatSchedules } from "../../../shared/NewClass.slice";
import { Button } from "../../button";
import { RepeatScheduleForm } from "../../forms/NewClass/RepeatSchedule";
import BaseModal from "../BaseModal";
import { EditRepeatSchedule } from "./EditRepeatSchedule";

import css from "./RepeatSchedule.module.css";
interface Props {}

export const RepeatSchedule: React.FC<Props> = () => {
  const [show, setShow] = React.useState(false);
  const repeatSchedules = useAppSelector(selectRepeatSchedules);
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

  return (
    <React.Fragment>
      {repeatSchedules.map((repeatSchedule) => (
        <EditRepeatSchedule
          data={repeatSchedule}
          childController={
            <div className={css.option}>
              <div>
                <div style={{ textTransform: "uppercase" }}>
                  {moment(repeatSchedule.startTime, "HH:mm").format("hh:mm a")}{" "}
                  {" - "}
                  {moment(repeatSchedule.endTime, "HH:mm").format("hh:mm a")}
                </div>
                <div className="txt-sm txt-thin">
                  {repeatSchedule.days
                    .map(
                      (day) =>
                        dayOfWeekOptions.filter((d) => d.value === day)[0].key
                    )
                    .join(", ")}
                </div>
              </div>
              <div></div>
            </div>
          }
        />
      ))}
      <Button
        type="button"
        as="neutral"
        style={{
          color: "var(--primary)",
          fontWeight: 600,
          border: "none",
          padding: "0.5rem",
        }}
        text="Add Time"
        onClick={() => setShow(true)}
      />
      <BaseModal parent={document.querySelector(".App") as Element} show={show}>
        <BaseModal.Body style={{ paddingTop: "2rem" }}>
          <div
            style={{
              top: "0.5rem",
              color: "black",
            }}
            onClick={() => {
              setShow(false);
            }}
            className={"close"}
          >
            <AiOutlineClose />
          </div>
          <RepeatScheduleForm setShow={setShow} />
        </BaseModal.Body>
      </BaseModal>
    </React.Fragment>
  );
};
