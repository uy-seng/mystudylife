import React from "react";
import { FaPlus } from "react-icons/fa";
import { DeleteSubject } from "..";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { GetSubjectsQuery } from "../../../generated/graphql";
import {
  selectToBeUpdatedSubjectPayload,
  setDefaultToBeUpdatedSubjectPayload,
} from "../../../shared/EditSubject.slice";
import { Button } from "../../button";
import { NewSubjectForm } from "../../forms";
import { EditSubjectForm } from "../../forms/EditSubject";
import BaseModal from "../BaseModal";

import css from "./EditSubject.module.css";

interface Props {
  childController: React.ReactNode;
  data: GetSubjectsQuery["getSubjects"][0] | null;
}

export const EditSubject: React.FC<Props> = ({ childController, data }) => {
  const [show, setShow] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const toBeUpdatedSubjectPayload = useAppSelector(
    selectToBeUpdatedSubjectPayload
  );

  React.useEffect(() => {
    if (data) {
      dispatch(
        setDefaultToBeUpdatedSubjectPayload({
          id: data.id,
          academicYearId: data.academicYear?.id,
          name: data.name,
        })
      );
    }
  }, [data, show]);

  if (data && toBeUpdatedSubjectPayload)
    return (
      <React.Fragment>
        <div onClick={() => setShow(true)}>{childController}</div>
        <BaseModal
          className="viewSubject"
          parent={document.querySelector(".App") as Element}
          show={show}
        >
          <BaseModal.Header>
            <BaseModal.Title>Edit Subject</BaseModal.Title>
          </BaseModal.Header>
          <BaseModal.Body>
            <EditSubjectForm setShow={setShow} />
            <div className={css.footer}>
              <Button
                onClick={() => setShow(false)}
                as="neutral"
                text="Cancel"
              />
            </div>
            <DeleteSubject
              parentClassName="viewSubject"
              subjectId={data.id}
              closeParent={() => setShow(false)}
            />
          </BaseModal.Body>
        </BaseModal>
      </React.Fragment>
    );
  else return null;
};
