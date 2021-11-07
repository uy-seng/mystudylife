import React from "react";
import { AiOutlineClose } from "react-icons/ai";

import { NewSubject } from "..";
import { useAppSelector } from "../../../app/hooks";
import { useGetSubjectsQuery } from "../../../generated/graphql";
import { selectScheduleComponentState } from "../../../shared/Schedule.slice";
import { Button } from "../../button";
import { HeaderSelect } from "../../select";
import BaseModal from "../BaseModal";
import { DeleteSubject } from "../DeleteSubject/DeleteSubject";
import { EditSubject } from "../EditSubject";

import css from "./ManageSubject.module.css";

interface Props {}

export const ManageSubject: React.FC<Props> = () => {
  const [show, setShow] = React.useState<boolean>(false);
  const { data, loading } = useGetSubjectsQuery();
  const { academicYears, selectedYear } = useAppSelector(
    selectScheduleComponentState
  );
  const [selectedAcademicYearId, setSelectedAcademicYearId] = React.useState<
    string | null
  >(null);
  const [subjects, setSubjects] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (data) {
      setSubjects(
        data!.getSubjects.filter(
          (subject) =>
            subject.academicYear?.id === selectedAcademicYearId ||
            !subject.academicYear
        )
      );
    }
  }, [data, selectedAcademicYearId]);

  React.useEffect(() => {
    if (selectedYear) setSelectedAcademicYearId(selectedYear.id);
  }, [selectedYear]);

  return (
    <React.Fragment>
      <Button
        as="neutral"
        text="Manage Subject"
        onClick={() => setShow(true)}
      />
      <BaseModal
        hide={() => setShow(false)}
        parent={document.querySelector(".App") as Element}
        show={show}
      >
        <BaseModal.Header>
          <HeaderSelect
            defaultValue={selectedAcademicYearId}
            setState={(value: string) => setSelectedAcademicYearId(value)}
            label="Manage Subject"
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
          <div
            onClick={() => {
              setShow(false);
            }}
            style={{
              top: "0",
            }}
            className={"close"}
          >
            <AiOutlineClose />
          </div>
          <div className={css.body}>
            {subjects.length > 0 ? (
              subjects.map((subject) => (
                <EditSubject
                  data={subject}
                  childController={
                    <div className={css.subject}>{subject.name}</div>
                  }
                />
              ))
            ) : (
              <div className={css.up}>
                <span>It's a little lonely today,&nbsp;</span>
                <NewSubject controller="link" />
                <span>?</span>
              </div>
            )}
          </div>
          <div className={css.footer}>
            <NewSubject controller="button" />
          </div>
        </BaseModal.Body>
      </BaseModal>
    </React.Fragment>
  );
};
