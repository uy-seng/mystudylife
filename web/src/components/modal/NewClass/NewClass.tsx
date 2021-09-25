import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectScheduleComponentState } from "../../../shared/Schedule.slice";
import { Button } from "../../button";
import { NewClassForm } from "../../forms";
import { HeaderSelect } from "../../select";
import BaseModal from "../BaseModal";

import css from "./NewClass.module.css";
interface Props {}

export const NewClass: React.FC<Props> = () => {
  const [show, setShow] = React.useState<boolean>(false);
  const { academicYears, selectedYear } = useAppSelector(
    selectScheduleComponentState
  );
  const [selectedAcademicYearId, setSelectedAcademicYearId] = React.useState<
    string | null
  >(null);

  React.useEffect(() => {
    if (selectedYear) setSelectedAcademicYearId(selectedYear.id);
  }, [selectedYear]);
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
            defaultValue={selectedAcademicYearId}
            setState={(value: string) => setSelectedAcademicYearId(value)}
            label="New Class"
            data={[
              {
                key: "None",
                value: null,
                label: "No year/term",
              },
              ...academicYears.map((academicYear) => {
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
        </BaseModal.Header>
        <BaseModal.Body>
          <div className={css.reminder}>
            {selectedAcademicYearId
              ? `This class will exist in your timetable from ${new Date(
                  academicYears.filter(
                    (academicYear) => academicYear.id === selectedAcademicYearId
                  )[0].startDate
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })} - ${new Date(
                  academicYears.filter(
                    (academicYear) => academicYear.id === selectedAcademicYearId
                  )[0].endDate
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })} unless start/end dates are specified.`
              : "This class will exist in your timetable indefinitely unless a year/term is set or start/end dates are specified."}
          </div>
          <NewClassForm setShow={setShow} />
        </BaseModal.Body>
      </BaseModal>
    </React.Fragment>
  );
};
