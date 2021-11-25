import React from "react";
import { Button } from "../../button";
import { NewHolidayForm } from "../../forms/NewHoliday/NewHoliday";
import BaseModal from "../BaseModal";
import css from "./NewHoliday.module.css";

interface Props {}

export const NewHoliday: React.FC<Props> = () => {
  const [show, setShow] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <Button
        style={{
          padding: "0.5rem"
        }}
        as="primary"
        text="New Holiday"
        onClick={() => setShow(true)}
      />
      <BaseModal
        hide={() => setShow(false)}
        className="newHoliday"
        parent={document.querySelector(".App") as Element}
        show={show}
      >
        <BaseModal.Header>
          <BaseModal.Title>New Holiday</BaseModal.Title>
          <BaseModal.Extra>2020/2021</BaseModal.Extra>
        </BaseModal.Header>
        <BaseModal.Body>
          <NewHolidayForm setShow={setShow} />
        </BaseModal.Body>
        <div className={css.footer}>
          <Button onClick={() => setShow(false)} as="neutral" text="Cancel" />
        </div>
      </BaseModal>
    </React.Fragment>
  );
};
