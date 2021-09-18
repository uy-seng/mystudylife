import React from "react";
import { Button } from "../../button";
import { NewSubjectForm } from "../../forms";
import BaseModal from "../BaseModal";

import css from "./NewSubject.module.css";

type controller = "button" | "link";
interface Props {
  controller: controller;
}

export const NewSubject: React.FC<Props> = ({ controller }) => {
  const [show, setShow] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      {controller === "button" && (
        <Button as="primary" text="New Subject" onClick={() => setShow(true)} />
      )}
      {controller === "link" && (
        <span onClick={() => setShow(true)} className={css.link}>
          add a subject
        </span>
      )}
      <BaseModal parent={document.querySelector(".App") as Element} show={show}>
        <BaseModal.Header>
          <BaseModal.Title>New Subject</BaseModal.Title>
        </BaseModal.Header>
        <BaseModal.Body>
          <NewSubjectForm />
          <div className={css.footer}>
            <Button onClick={() => setShow(false)} as="neutral" text="Cancel" />
          </div>
        </BaseModal.Body>
      </BaseModal>
    </React.Fragment>
  );
};
