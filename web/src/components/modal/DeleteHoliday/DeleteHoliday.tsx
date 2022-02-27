import React from "react";
import { AiFillDelete } from "react-icons/ai";
import {
  useDeleteClassMutation,
  useDeleteHolidayMutation,
  useGetAcademicYearsQuery,
  useGetClassesQuery
} from "../../../generated/graphql";
import { Button, LoaderButton } from "../../button";
import BaseModal from "../BaseModal";
import css from "./DeleteHoliday.module.css";

interface Props {
  holidayId: string;
  parentClassName: string;
  closeParent: () => void;
}

export const DeleteHoliday: React.FC<Props> = ({
  parentClassName,
  closeParent,
  holidayId
}) => {
  const [show, setShow] = React.useState(false);
  const [deleteHoliday, { loading }] = useDeleteHolidayMutation();
  const { refetch } = useGetAcademicYearsQuery();

  return (
    <React.Fragment>
      <div
        style={{ top: "85%", right: "84%", color: "var(--error)" }}
        className="delete"
        onClick={() => setShow(true)}
      >
        <AiFillDelete />
        <span>Delete</span>
      </div>
      {document.querySelector(`.${parentClassName}`) && (
        <BaseModal
          show={show}
          parent={document.querySelector(`.${parentClassName}`) as Element}
        >
          <div className={css.wrapper}>
            <div>Are you sure?</div>
            <div>You are about to this holiday occurence</div>
            <div>
              <LoaderButton
                onClick={async () => {
                  await deleteHoliday({
                    variables: {
                      id: holidayId
                    }
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
