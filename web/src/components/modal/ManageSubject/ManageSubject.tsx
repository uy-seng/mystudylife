import React from "react";
import { Button } from "../../button";
import BaseModal from "../BaseModal";

interface Props {}

export const ManageSubject: React.FC<Props> = () => {
  const [show, setShow] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <Button
        style={{
          backgroundColor: "white",
          color: "black",
          border: "1px solid var(--border-gray)",
        }}
        as="secondary"
        text="Manage Subject"
        onClick={() => setShow(true)}
      />
      <BaseModal parent={document.querySelector(".App") as Element} show={show}>
        <BaseModal.Header>
          <BaseModal.Title>New Task</BaseModal.Title>
          <BaseModal.Extra>2020/2021</BaseModal.Extra>
        </BaseModal.Header>
        <BaseModal.Body>
          <form style={{ width: "max-content" }}>
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="subject">Subject</label>
                <input type="text" name="subject" id="subject" />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="type">Type</label>
                <input type="text" name="type" id="type" />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="due-date">Due Date</label>
              <input type="text" name="due-date" id="due-date" />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="title">Title</label>
              <input type="text" name="title" id="title" />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="detail">Detail</label>
              <input type="text" name="detail" id="detail" />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button type="button" onClick={() => setShow(false)}>
                Cancel
              </button>
              <button>Submit</button>
            </div>
          </form>
        </BaseModal.Body>
      </BaseModal>
    </React.Fragment>
  );
};
