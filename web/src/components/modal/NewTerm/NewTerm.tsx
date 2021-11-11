import React from "react";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import { Button } from "../../button";
import BaseModal from "../BaseModal";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  rerenderNewAcademicYearComponent,
  selectCreateTermComponentState,
  setTerms,
} from "../../../shared/NewAcademicYear.slice";
import { NewTermForm } from "../../forms";

import css from "./NewTerm.module.css";
import { EditTerm } from "../EditTerm";

interface Props {}

export const NewTerm: React.FC<Props> = () => {
  const [show, setShow] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { terms } = useAppSelector(selectCreateTermComponentState);

  return (
    <React.Fragment>
      {terms.map((term) => (
        <EditTerm
          data={term}
          childController={
            <div className={css.term}>
              <div style={{ cursor: "pointer", width: "100%" }}>
                <div className="txt-md">{term.name}</div>
                <div className="txt-sm txt-thin">
                  {term.startDate} - {term.endDate}
                </div>
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(
                    setTerms([
                      ...terms.filter(
                        (t) => JSON.stringify(t) !== JSON.stringify(term)
                      ),
                    ])
                  );
                }}
              >
                <AiFillDelete />
              </div>
            </div>
          }
        />
      ))}
      <Button
        type="button"
        style={{
          color: "var(--primary)",
          backgroundColor: "white",
          fontWeight: 600,
          padding: "0.5rem 0 0 0",
          width: "100%",
          borderTop: "1px solid var(--border-gray)",
          marginTop: "1rem",
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
          <NewTermForm setShow={setShow} />
        </BaseModal.Body>
      </BaseModal>
    </React.Fragment>
  );
};
