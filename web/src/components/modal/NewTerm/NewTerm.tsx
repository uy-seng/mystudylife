import React from "react";
import { Button } from "../../button";
import BaseModal from "../BaseModal";

interface Props {}

export const NewTerm: React.FC<Props> = () => {
  const [show, setShow] = React.useState<boolean>(false);
  return (
    <React.Fragment>
      <Button
        style={{
          color: "var(--primary)",
          backgroundColor: "white",
          fontWeight: 600,
          padding: 0,
        }}
        as="primary"
        text="New Term"
        onClick={() => setShow(true)}
      />
      <BaseModal
        parent={document.querySelector(".newAcademicYear") as HTMLElement}
        show={show}
      >
        <BaseModal.Body>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div></div>
        </BaseModal.Body>
      </BaseModal>
    </React.Fragment>
  );
};
