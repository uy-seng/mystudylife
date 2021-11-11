import React from "react";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import { Button } from "../../button";
import BaseModal from "../BaseModal";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  rerenderNewAcademicYearComponent,
  selectCreateTermComponentState,
  selectEditTermPayload,
  setDefaultEditTermPayload,
  setEditTermPayload,
  TermPayload,
} from "../../../shared/NewAcademicYear.slice";
import { NewTermForm } from "../../forms";

import css from "./EditTerm.module.css";
import { EditTermForm } from "../../forms/EditTerm/EditTerm";

interface Props {
  data: TermPayload;
  childController: React.ReactNode;
}

export const EditTerm: React.FC<Props> = ({ data, childController }) => {
  const [show, setShow] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const editTermPayload = useAppSelector(selectEditTermPayload);

  React.useEffect(() => {
    if (data) dispatch(setDefaultEditTermPayload(data));
  }, [show]);

  if (editTermPayload)
    return (
      <React.Fragment>
        <div style={{ marginBottom: "1rem" }} onClick={() => setShow(true)}>
          {childController}
        </div>
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
            <EditTermForm setShow={setShow} />
          </BaseModal.Body>
        </BaseModal>
      </React.Fragment>
    );
  else return null;
};
