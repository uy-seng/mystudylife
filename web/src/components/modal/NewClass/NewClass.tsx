import React from "react";
import { Button } from "../../button";
import BaseModal from "../BaseModal";

interface Props {}

export const NewClass: React.FC<Props> = () => {
  const [show, setShow] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <Button
        style={{
          padding: "0.5rem",
        }}
        as="primary"
        text={`New Class`}
        onClick={() => setShow(true)}
      />
      <BaseModal
        className="newClass"
        parent={document.querySelector(".App") as Element}
        show={show}
      >
        <BaseModal.Header>
          <BaseModal.Title>New Academic Year</BaseModal.Title>
          <BaseModal.Extra>2020/2021</BaseModal.Extra>
        </BaseModal.Header>
        <BaseModal.Body></BaseModal.Body>
      </BaseModal>
    </React.Fragment>
  );
};
