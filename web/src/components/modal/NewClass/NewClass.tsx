import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useGetAcademicYearsQuery } from "../../../generated/graphql";
import {
  selectClassPayload,
  selectClassSchedulePayload,
  setClassPayload,
} from "../../../shared/NewClass.slice";
import { selectScheduleComponentState } from "../../../shared/Schedule.slice";
import { Button } from "../../button";
import { NewClassForm } from "../../forms";
import { HeaderSelect } from "../../select";
import BaseModal from "../BaseModal";

import css from "./NewClass.module.css";
interface Props {}

export const NewClass: React.FC<Props> = () => {
  const [show, setShow] = React.useState<boolean>(false);
  // const { academicYears, selectedYear } = useAppSelector(
  //   selectScheduleComponentState
  // );
  const { data: academicYears } = useGetAcademicYearsQuery();

  // const [selectedAcademicYearId, setSelectedAcademicYearId] = React.useState<
  //   string | null
  // >(null);
  const { academicYearId } = useAppSelector(selectClassPayload);
  const dispatch = useAppDispatch();
  const { type: classScheduleType } = useAppSelector(
    selectClassSchedulePayload
  );

  const { selectedYear } = useAppSelector(selectScheduleComponentState);

  React.useEffect(() => {
    if (selectedYear) {
      dispatch(
        setClassPayload({
          key: "academicYearId",
          value: selectedYear.id,
        })
      );
    }
  }, [selectedYear]);

  if (academicYears)
    return (
      <React.Fragment>
        <Button
          style={{
            padding: "0.5rem",
          }}
          as="primary"
          text={`New Class`}
          onClick={() => setShow(true)}
        />
        <BaseModal
          className="newClass"
          parent={document.querySelector(".App") as Element}
          show={show}
        >
          <BaseModal.Header>
            <HeaderSelect
              defaultValue={academicYearId}
              setState={(value: string) =>
                dispatch(
                  setClassPayload({
                    key: "academicYearId",
                    value: value,
                  })
                )
              }
              label="New Class"
              data={[
                {
                  key: "None",
                  value: null,
                  label: "No year/term",
                },
                ...academicYears.getAcademicYears.map((academicYear) => {
                  return {
                    key: `${academicYear.startDate.split("-")[0]} - ${
                      academicYear.endDate.split("-")[0]
                    }`,
                    label: `${academicYear.startDate.split("-")[0]} - ${
                      academicYear.endDate.split("-")[0]
                    }`,
                    value: academicYear.id,
                  };
                }),
              ]}
            />
            <div
              onClick={() => {
                setShow(false);
              }}
              className="close"
              style={{ top: "2rem" }}
            >
              <AiOutlineClose />
            </div>
          </BaseModal.Header>
          <BaseModal.Body>
            {classScheduleType === "repeat" && (
              <div className={css.reminder}>
                {academicYearId
                  ? `This class will exist in your timetable from ${new Date(
                      academicYears.getAcademicYears.filter(
                        (academicYear) => academicYear.id === academicYearId
                      )[0].startDate
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })} - ${new Date(
                      academicYears.getAcademicYears.filter(
                        (academicYear) => academicYear.id === academicYearId
                      )[0].endDate
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })} unless start/end dates are specified.`
                  : "This class will exist in your timetable indefinitely unless a year/term is set or start/end dates are specified."}
              </div>
            )}
            <NewClassForm setShow={setShow} />
          </BaseModal.Body>
        </BaseModal>
      </React.Fragment>
    );
  return null;
};
