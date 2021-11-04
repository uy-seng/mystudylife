import React from "react";
import { Button } from "../../button";
import { NewAcademicYearForm } from "../../forms";
import BaseModal from "../BaseModal";
import css from "./NewAcademicYear.module.css";

interface Props {}

export const NewAcademicYear: React.FC<Props> = () => {
  const [show, setShow] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <Button
        as="primary"
        text="New Academic Year"
        onClick={() => setShow(true)}
      />
      <BaseModal
        hide={() => setShow(false)}
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
