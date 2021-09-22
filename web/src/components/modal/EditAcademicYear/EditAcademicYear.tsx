import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectScheduleComponentState } from "../../../shared/Schedule.slice";
import { Button } from "../../button";
import { NewAcademicYearForm } from "../../forms";
import BaseModal from "../BaseModal";
import css from "./EditAcademicYear.module.css";

interface Props {}

export const EditAcademicYear: React.FC<Props> = () => {
  const [show, setShow] = React.useState<boolean>(false);
  const { startDate, endDate } = useAppSelector(selectScheduleComponentState)
    .selectedYear!;

  return (
    <React.Fragment>
      <Button
        as="neutral"
        text={`Edit ${startDate.split("-")[0]} - ${endDate.split("-")[0]}`}
        onClick={() => setShow(true)}
      />
      <BaseModal
        className="newAcademicYear"
        parent={document.querySelector(".App") as Element}
        show={show}
      >
        <BaseModal.Header>
          <BaseModal.Title>New Academic Year</BaseModal.Title>
          <BaseModal.Extra>2020/2021</BaseModal.Extra>
        </BaseModal.Header>
        <BaseModal.Body>
          <NewAcademicYearForm setShow={setShow} />
        </BaseModal.Body>
        <div className={css.footer}>
          <Button onClick={() => setShow(false)} as="neutral" text="Cancel" />
        </div>
      </BaseModal>
    </React.Fragment>
  );
};
