import moment from "moment";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useAppSelector } from "../../../app/hooks";
import { selectToBeUpdatedRepeatSchedules } from "../../../shared/EditClass.slice";
import {
  RepeatSchedulePayload,
  selectRepeatSchedules,
} from "../../../shared/NewClass.slice";
import { Button } from "../../button";
import { EditRepeatScheduleForm } from "../../forms/EditClass/EditRepeatSchedule";
import { NewRepeatScheduleForm } from "../../forms/EditClass/NewRepeatSchedule";
import { RepeatScheduleForm } from "../../forms/NewClass/RepeatSchedule";
import BaseModal from "../BaseModal";

import css from "./EditRepeatSchedule.module.css";
interface Props {
  childController: React.ReactNode;
  data: RepeatSchedulePayload & { id: string };
}

export const EditRepeatSchedule: React.FC<Props> = ({
  childController,
  data,
}) => {
  const [show, setShow] = React.useState(false);
  const toBeUpdatedRepeatSchedules = useAppSelector(
    selectToBeUpdatedRepeatSchedules
  );

  if (toBeUpdatedRepeatSchedules && data)
    return (
      <React.Fragment>
        <div onClick={() => setShow(true)}>{childController}</div>
        <BaseModal
          parent={document.querySelector(".App") as Element}
          show={show}
        >
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
            <EditRepeatScheduleForm data={data} setShow={setShow} />
          </BaseModal.Body>
        </BaseModal>
      </React.Fragment>
    );
  else return null;
};
