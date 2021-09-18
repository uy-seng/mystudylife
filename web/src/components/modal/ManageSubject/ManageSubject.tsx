import React from "react";
import { AiOutlineClose } from "react-icons/ai";

import { NewSubject } from "..";
import { Button } from "../../button";
import BaseModal from "../BaseModal";

import css from "./ManageSubject.module.css";

interface Props {}

export const ManageSubject: React.FC<Props> = () => {
  const [show, setShow] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <Button
        as="neutral"
        text="Manage Subject"
        onClick={() => setShow(true)}
      />
      <BaseModal parent={document.querySelector(".App") as Element} show={show}>
        <BaseModal.Header>
          <BaseModal.Title>Manage Subjects</BaseModal.Title>
          <BaseModal.Extra>2020/2021</BaseModal.Extra>
        </BaseModal.Header>
        <BaseModal.Body>
          <div
            onClick={() => {
              setShow(false);
            }}
            className={css.close}
          >
            <AiOutlineClose />
          </div>
          <div className={css.body}>
            <div className={css.up}>
              <span>It's a little lonely today,&nbsp;</span>
              <NewSubject controller="link" />
              <span>?</span>
            </div>
          </div>
          <div className={css.footer}>
            <NewSubject controller="button" />
          </div>
        </BaseModal.Body>
      </BaseModal>
    </React.Fragment>
  );
};
