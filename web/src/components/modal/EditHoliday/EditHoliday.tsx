import React from "react";
import { BsPencil } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  GetAcademicYearQuery,
  GetAcademicYearsQuery
} from "../../../generated/graphql";
import {
  selectToBeUpdatedHolidayPayload,
  setDefaultToBeUpdatedHolidayPayload,
  setToBeUpdatedHolidayPayload
} from "../../../shared/EditHoliday.slice";
import { HolidayPayload } from "../../../shared/NewHoliday.slice";
import { formatDate } from "../../../utils";
import { Button } from "../../button";
import { EditHolidayForm } from "../../forms/EditHoliday";
import { NewHolidayForm } from "../../forms/NewHoliday/NewHoliday";
import BaseModal from "../BaseModal";
import { DeleteHoliday } from "../DeleteHoliday";
import css from "./EditHoliday.module.css";

interface Props {
  academicYearId: string;
  c: GetAcademicYearsQuery["getAcademicYears"][0]["holidays"][0];
  childController: React.ReactNode;
}

export const EditHoliday: React.FC<Props> = ({
  academicYearId,
  c,
  childController
}) => {
  const [show, setShow] = React.useState<boolean>(false);
  const toBeUpdatedHolidayPayload = useAppSelector(
    selectToBeUpdatedHolidayPayload
  );
  const [defaultHolidayPayload, setDefaultHolidayPayload] = React.useState<
    (HolidayPayload & { id: string }) | undefined
  >(undefined);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (c) {
      dispatch(
        setDefaultToBeUpdatedHolidayPayload({
          academicYearId: academicYearId,
          id: c.id,
          startDate: formatDate(new Date(c.startDate)),
          endDate: formatDate(new Date(c.endDate)),
          name: c.name
        })
      );
      setDefaultHolidayPayload({
        academicYearId: academicYearId,
        id: c.id,
        startDate: formatDate(new Date(c.startDate)),
        endDate: formatDate(new Date(c.endDate)),
        name: c.name
      });
    }
  }, [c]);

  if (toBeUpdatedHolidayPayload && defaultHolidayPayload)
    return (
      <React.Fragment>
        <div onClick={() => setShow(true)}>{childController}</div>
        <BaseModal
          hide={() => {
            dispatch(
              setDefaultToBeUpdatedHolidayPayload({
                ...defaultHolidayPayload
              })
            );
            setShow(false);
          }}
          className="editHoliday"
          parent={document.querySelector(".App") as Element}
          show={show}
        >
          <BaseModal.Header>
            <BaseModal.Title>Edit Holiday</BaseModal.Title>
            <BaseModal.Extra>2020/2021</BaseModal.Extra>
          </BaseModal.Header>
          <BaseModal.Body style={{ position: "relative" }}>
            <EditHolidayForm setShow={setShow} />
            <DeleteHoliday
              holidayId={c.id}
              closeParent={() => setShow(false)}
              parentClassName={"editHoliday"}
            />
          </BaseModal.Body>
          <div className={css.footer}>
            <Button
              onClick={() => {
                dispatch(
                  setDefaultToBeUpdatedHolidayPayload({
                    ...defaultHolidayPayload
                  })
                );
                setShow(false);
              }}
              as="neutral"
              text="Cancel"
            />
          </div>
        </BaseModal>
      </React.Fragment>
    );
  return null;
};
