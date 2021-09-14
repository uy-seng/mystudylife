import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { NewAcademicYear } from "..";
import { Button } from "../../button";
import { Datepicker } from "../../datepicker";
import { BasicTextInput } from "../../input/BasicTextInput";
import BaseModal from "../BaseModal";
import css from "./NewTerm.module.css";
import { useAppDispatch } from "../../../app/hooks";
import { rerenderNewAcademicYearComponent } from "../../../shared/NewAcademicYear.slice";

interface Props {}

export const NewTerm: React.FC<Props> = () => {
  const [show, setShow] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

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
          <div
            onClick={() => {
              setShow(false);
              dispatch(rerenderNewAcademicYearComponent());
            }}
            className={css.close}
          >
            <AiOutlineClose />
          </div>
          <div>
            <div>
              <BasicTextInput
                placeholder="eg. Winter Term, Spring Quarter"
                label="Name"
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "1rem",
            }}
          >
            <div
              style={{
                marginRight: "1rem",
              }}
            >
              <Datepicker label="Start Date" />
            </div>
            <div>
              <Datepicker label="End Date" />
            </div>
          </div>
          <div
            style={{
              marginTop: "1rem",
            }}
          >
            <Button
              style={{
                padding: "0.5rem",
              }}
              text="Save"
              as="primary"
            />
          </div>
        </BaseModal.Body>
      </BaseModal>
    </React.Fragment>
  );
};
