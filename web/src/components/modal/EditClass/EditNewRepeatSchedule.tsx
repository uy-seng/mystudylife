import moment from "moment";
import React from "react";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectNewRepeatSchedules,
  setNewRepeatSchedules,
} from "../../../shared/EditClass.slice";
import {
  RepeatSchedulePayload,
  selectRepeatSchedules,
  setRepeatSchedules,
} from "../../../shared/NewClass.slice";
import { EditNewRepeatScheduleForm } from "../../forms/EditClass/EditNewRepeatSchedule";
import { EditRepeatScheduleForm } from "../../forms/NewClass/EditRepeatSchedule";
import BaseModal from "../../modal/BaseModal";
import css from "./EditRepeatSchedule.module.css";

interface Props {
  childController: React.ReactNode;
  data: RepeatSchedulePayload;
}

export const EditNewRepeatSchedule: React.FC<Props> = ({
  childController,
  data,
}) => {
  const [show, setShow] = React.useState(false);
  const newRepeatSchedules = useAppSelector(selectNewRepeatSchedules);
  const dispatch = useAppDispatch();

  if (newRepeatSchedules && data)
    return (
      <React.Fragment>
        <div className={css.wrapper}>
          <div className={css.controller} onClick={() => setShow(true)}>
            {childController}
          </div>
          <div
            onClick={() => {
              dispatch(
                setNewRepeatSchedules([
                  ...newRepeatSchedules.filter(
                    (repeatSchedule) =>
                      JSON.stringify(repeatSchedule) !== JSON.stringify(data)
                  ),
                ])
              );
            }}
            className={css.delete}
          >
            <AiFillDelete />
          </div>
        </div>
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
            <EditNewRepeatScheduleForm data={data} setShow={setShow} />
          </BaseModal.Body>
        </BaseModal>
      </React.Fragment>
    );
  else return null;
};
