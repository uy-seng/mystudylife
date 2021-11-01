import moment from "moment";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useAppSelector } from "../../../app/hooks";
import { selectToBeUpdatedRepeatSchedules } from "../../../shared/EditClass.slice";
import { selectRepeatSchedules } from "../../../shared/NewClass.slice";
import { Button } from "../../button";
import { NewRepeatScheduleForm } from "../../forms/EditClass/NewRepeatSchedule";
import { RepeatScheduleForm } from "../../forms/NewClass/RepeatSchedule";
import BaseModal from "../BaseModal";

interface Props {}

export const NewRepeatSchedule: React.FC<Props> = () => {
  const [show, setShow] = React.useState(false);
  const toBeUpdatedRepeatSchedules = useAppSelector(
    selectToBeUpdatedRepeatSchedules
  );

  if (toBeUpdatedRepeatSchedules)
    return (
      <React.Fragment>
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
        <BaseModal
          parent={document.querySelector(".App") as Element}
          show={show}
        >
          <BaseModal.Body style={{ paddingTop: "2rem" }}>
            <div
              style={{
                top: "1rem",
                color: "black",
              }}
              onClick={() => {
                setShow(false);
              }}
              className={"close"}
            >
              <AiOutlineClose />
            </div>
            <NewRepeatScheduleForm setShow={setShow} />
          </BaseModal.Body>
        </BaseModal>
      </React.Fragment>
    );
  else return null;
};
