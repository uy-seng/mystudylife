import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "../../button";
import { BasicTextInput } from "../../input/BasicTextInput";
import BaseModal from "../BaseModal";
import css from "./NewTerm.module.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  addNewTerm,
  rerenderNewAcademicYearComponent,
  selectAcademicYearPayload,
  selectCreateTermComponentState,
  setTermPayload,
  TermPayload,
} from "../../../shared/NewAcademicYear.slice";
import { Datepicker } from "../../input";
import NewTermForm from "../../forms/NewTerm.form";

interface Props {}

export const NewTerm: React.FC<Props> = () => {
  const [show, setShow] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { payload, terms } = useAppSelector(selectCreateTermComponentState);

  return (
    <React.Fragment>
      {terms.map((term) => (
        <div>
          <div className="txt-lg">{term.name}</div>
          <div className="txt-md">
            {term.startDate} - {term.endDate}
          </div>
        </div>
      ))}
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
          <NewTermForm />
        </BaseModal.Body>
      </BaseModal>
    </React.Fragment>
  );
};
