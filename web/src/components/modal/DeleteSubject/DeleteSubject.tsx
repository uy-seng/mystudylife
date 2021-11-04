import React from "react";
import { AiFillDelete } from "react-icons/ai";
import {
  useDeleteClassMutation,
  useDeleteSubjectMutation,
  useGetClassesQuery,
  useGetSubjectsQuery,
} from "../../../generated/graphql";
import { Button, LoaderButton } from "../../button";
import BaseModal from "../BaseModal";
import css from "./DeleteSubject.module.css";

interface Props {
  subjectId: string;
  parentClassName: string;
  closeParent: () => void;
}

export const DeleteSubject: React.FC<Props> = ({
  parentClassName,
  closeParent,
  subjectId,
}) => {
  const [show, setShow] = React.useState(false);
  const [deleteSubject, { loading }] = useDeleteSubjectMutation();
  const { refetch } = useGetSubjectsQuery();

  return (
    <React.Fragment>
      <div
        style={{
          top: "80%",
          left: "1.5rem",
          width: "fit-content",
          color: "black",
        }}
        className="delete"
        onClick={() => setShow(true)}
      >
        <AiFillDelete />
        <div style={{ marginLeft: "0.5rem" }}>Delete</div>
      </div>
      {document.querySelector(`.${parentClassName}`) && (
        <BaseModal
          show={show}
          parent={document.querySelector(`.${parentClassName}`) as Element}
        >
          <div className={css.wrapper}>
            <div>Are you sure?</div>
            <div>
              Deleting ok will delete all associated classes, tasks and exams,
              are you sure?
            </div>
            <div>
              <LoaderButton
                onClick={async () => {
                  await deleteSubject({
                    variables: {
                      id: subjectId,
                    },
                  })
                    .then(async () => {
                      await refetch();
                      setShow(false);
                      closeParent();
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
                style={{ padding: "1rem 2rem" }}
                loading={loading}
                as="primary"
                text="Yes"
              />
              <Button as="secondary" text="No" onClick={() => setShow(false)} />
            </div>
          </div>
        </BaseModal>
      )}
    </React.Fragment>
  );
};
